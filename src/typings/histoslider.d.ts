declare module 'histoslider' {
    import * as React from 'react';

    export interface HistosliderBucket {
        x0: number,
        x: number,
        y: number
    }

    export interface HistosliderProps {
        data: Array<HistosliderBucket>;
        padding?: number;
        width?: number;
        height?: number;
        selection: [number, number];
        step?: number;
        labels?: boolean;
        onChange([number, number]): void;

        selectedColor?: string;
        unselectedColor?: string;
        barBorderRadius?: number;

        barStyle?: React.StyleHTMLAttributes;
        histogramStyle?: React.StyleHTMLAttributes;
        sliderStyle?: React.StyleHTMLAttributes;

        showOnDrag?: boolean;
        style?: any;
        handleLabelFormat?: string;
        disableHistogram?: boolean;
        showLabels?: boolean;
    }

    export class Histoslider extends React.Component<HistosliderProps, any> { 
    }
}