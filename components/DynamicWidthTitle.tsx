"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

interface DynamicWidthTitleProps {
    children: string;
    className?: string;
}

interface TextState {
    fontSize: number;
    width: number;
    mode: 'single' | 'double';
}

export default function DynamicWidthTitle({ children, className = '' }: DynamicWidthTitleProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | undefined>();
    const debounceRef = useRef<NodeJS.Timeout | undefined>();
    const previousModeRef = useRef<'single' | 'double'>('single');

    const [state, setState] = useState<TextState>({
        fontSize: 32,
        width: 50,
        mode: 'single'
    });
    const [isReady, setIsReady] = useState(false);
    const [fontLoaded, setFontLoaded] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const words = useMemo(() => children.split(' '), [children]);

    const measureText = useCallback((
        text: string,
        fontSize: number,
        width: number,
        isTwoLine: boolean
    ): { width: number; height: number } => {
        if (!measureRef.current) return { width: 0, height: 0 };

        measureRef.current.style.fontSize = `${fontSize}px`;
        measureRef.current.style.fontVariationSettings = `'wdth' ${width}`;

        if (isTwoLine) {
            measureRef.current.innerHTML = words.map(w => `<div>${w}</div>`).join('');
            measureRef.current.style.whiteSpace = 'normal';
            measureRef.current.style.lineHeight = '0.75';
        } else {
            measureRef.current.innerHTML = text;
            measureRef.current.style.whiteSpace = 'nowrap';
            measureRef.current.style.lineHeight = '1';
        }

        const rect = measureRef.current.getBoundingClientRect();
        return { width: rect.width, height: rect.height };
    }, [words]);

    const findOptimalSize = useCallback((
        containerWidth: number,
        containerHeight: number,
        targetWidthRatio: number,
        isTwoLine: boolean
    ): { fontSize: number; width: number } | null => {
        const targetWidth = containerWidth * targetWidthRatio;
        const targetHeight = containerHeight * 0.8;

        let bestFontSize = 0;
        let bestWidth = 50;

        // Binary search for font size
        let minSize = 8;
        let maxSize = isTwoLine ? 160 : 128;

        while (maxSize - minSize > 1) {
            const midSize = Math.floor((minSize + maxSize) / 2);
            let foundValidWidth = false;

            // Binary search for width at this font size
            let minWidth = 50;
            let maxWidth = isTwoLine ? 150 : 100;

            while (maxWidth - minWidth > 1) {
                const midWidth = Math.floor((minWidth + maxWidth) / 2);
                const { width: textWidth, height: textHeight } = measureText(
                    children,
                    midSize,
                    midWidth,
                    isTwoLine
                );

                if (textWidth <= targetWidth && textHeight <= targetHeight) {
                    minWidth = midWidth;
                    foundValidWidth = true;
                    bestFontSize = midSize;
                    bestWidth = midWidth;
                } else {
                    maxWidth = midWidth;
                }
            }

            if (foundValidWidth) {
                minSize = midSize;
            } else {
                maxSize = midSize;
            }
        }

        return bestFontSize > 0 ? { fontSize: bestFontSize, width: bestWidth } : null;
    }, [children, measureText]);

    const calculateOptimalSize = useCallback(() => {
        if (!containerRef.current || !measureRef.current) return;

        // Cancel any pending animation frame
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }

        rafRef.current = requestAnimationFrame(() => {
            const rect = containerRef.current!.getBoundingClientRect();
            const containerWidth = rect.width;
            const containerHeight = rect.height;

            // Calculate optimal sizes for both modes
            const singleLineResult = findOptimalSize(containerWidth, containerHeight, 0.98, false);
            const twoLineResult = words.length >= 2
                ? findOptimalSize(containerWidth, containerHeight, 0.85, true)
                : null;

            // Determine which mode to use
            let newState: TextState;

            if (!twoLineResult || !singleLineResult) {
                // Fallback if calculation fails
                newState = {
                    fontSize: 32,
                    width: 50,
                    mode: 'single'
                };
            } else {
                // Add hysteresis to prevent rapid switching
                const currentMode = previousModeRef.current;
                const hysteresisFactor = currentMode === 'double' ? 1.1 : 1.3;

                if (twoLineResult.fontSize > singleLineResult.fontSize * hysteresisFactor) {
                    newState = {
                        fontSize: twoLineResult.fontSize,
                        width: twoLineResult.width,
                        mode: 'double'
                    };
                } else {
                    newState = {
                        fontSize: singleLineResult.fontSize,
                        width: singleLineResult.width,
                        mode: 'single'
                    };
                }
            }

            // Only update if there's a significant change
            setState(prevState => {
                const hasSignificantChange =
                    Math.abs(prevState.fontSize - newState.fontSize) > 1 ||
                    Math.abs(prevState.width - newState.width) > 2 ||
                    prevState.mode !== newState.mode;

                if (hasSignificantChange) {
                    if (prevState.mode !== newState.mode) {
                        setIsTransitioning(true);
                        setTimeout(() => setIsTransitioning(false), 300);
                    }
                    previousModeRef.current = newState.mode;
                    return newState;
                }
                return prevState;
            });
        });
    }, [words.length, findOptimalSize]);

    // Debounced resize handler
    const handleResize = useCallback(() => {
        if (!isReady) return;

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            calculateOptimalSize();
        }, 50); // 50ms debounce
    }, [calculateOptimalSize, isReady]);

    useEffect(() => {
        // Check if font is loaded and keep it loaded
        const checkFont = async () => {
            try {
                // Load and keep the font active
                await document.fonts.load('100 1rem "VVDS Fifties Variable"');
                const fontFace = [...document.fonts].find(f => f.family === 'VVDS Fifties Variable');
                if (fontFace && fontFace.status === 'loaded') {
                    setFontLoaded(true);
                    setIsReady(true);
                    calculateOptimalSize();
                }
            } catch (e) {
                // Fallback if font loading API not supported
                setFontLoaded(true);
                setIsReady(true);
                setTimeout(calculateOptimalSize, 100);
            }
        };

        checkFont();

        const resizeObserver = new ResizeObserver(handleResize);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            resizeObserver.disconnect();
            if (debounceRef.current !== undefined) {
                clearTimeout(debounceRef.current);
            }
            if (rafRef.current !== undefined) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [handleResize, calculateOptimalSize]);

    return (
        <div ref={containerRef} className={`relative h-full w-full ${className}`}>
            {/* Hidden measure element */}
            <div
                ref={measureRef}
                className="fixed left-[-9999px] top-0 uppercase pointer-events-none"
                style={{
                    visibility: 'hidden',
                    position: 'fixed',
                    fontFamily: '"VVDS Fifties Variable"',
                    letterSpacing: '-0.01em',
                    fontWeight: 100,
                    fontFeatureSettings: '"kern" 1',
                    fontKerning: 'normal'
                }}
                aria-hidden="true"
            />

            {/* Visible text with smooth transitions */}
            <div
                className={`h-full w-full flex items-center ${state.mode === 'single' ? 'justify-end' : 'justify-start'
                    }`}
                style={{
                    transition: isTransitioning ? 'justify-content 0.3s ease-out' : 'none'
                }}
            >
                <div
                    ref={textRef}
                    className="uppercase"
                    style={{
                        fontFamily: '"VVDS Fifties Variable"',
                        fontVariationSettings: `'wdth' ${state.width}`,
                        fontSize: `${state.fontSize}px`,
                        letterSpacing: '-0.01em',
                        fontWeight: 100,
                        lineHeight: state.mode === 'double' ? 0.75 : 1,
                        whiteSpace: state.mode === 'single' ? 'nowrap' : 'normal',
                        textAlign: state.mode === 'single' ? 'right' : 'left',
                        opacity: fontLoaded && isReady ? 1 : 0,
                        fontFeatureSettings: '"kern" 1',
                        fontKerning: 'normal',
                        transition: `
                            font-variation-settings 0.2s linear,
                            font-size 0.2s linear,
                            line-height 0.2s linear,
                            opacity 0.3s ease-out
                        `,
                        willChange: 'font-variation-settings, font-size'
                    }}
                >
                    {state.mode === 'single' ? (
                        children
                    ) : (
                        words.map((word, i) => (
                            <div key={i}>{word}</div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
} 