export type IThemeColors = {
    white: string;
    primary: string;
    secondary: string;
    success: string;
    info: string;
    warning: string;
    danger: string;
    light: string;
    dark: string;
}
export interface IHtmlConfig{
    demo: string;
    self: {
        layout: string;
        logo: {
            dark: string;
            light: string;
            brand: string;
            green: string;
        }
    },
    loader: {
        type: string,
        logo: string,
        message: string
    },
    breakpoints: {
        sm: number;
        md: number;
        lg: number;
        xl: number;
        xxl: number;
    };
    colors: {
        theme: {
            base: IThemeColors;
            light: IThemeColors;
            inverse: IThemeColors;
        };
        gray: {
            "gray-100": string;
            "gray-200": string;
            "gray-300": string;
            "gray-400": string;
            "gray-500": string;
            "gray-600": string;
            "gray-700": string;
            "gray-800": string;
            "gray-900": string;        }
    };
    "font-family": string,
    header: {
        self: {
                display: boolean;
                width: string;
                theme: string;
                fixed: {
                    desktop: boolean;
                    mobile: boolean;
                }
            };
        menu: {
            self: {
                display: boolean;
                layout: string;
                "root-arrow": boolean;
            };
            desktop: {
                arrow: boolean;
                toggle: string;
                submenu: {
                    theme: string;
                    arrow: boolean;
                }
            },
            mobile: {
                submenu: {
                    theme: string;
                    accordion: boolean;
                }
            }
        }
    };
    subheader: {
        display: boolean;
        displayDesc: boolean;
        displayDaterangepicker: boolean;
        layout: string;
        fixed: boolean;
        width: string;
        clear: boolean;
        style: string;
    };
    content: {
        width: string;
    };
    brand: {
        self: {
            theme: string
        }
    };
    aside: {
        self: {
            theme: string,
            display: boolean;
            fixed: boolean;
            minimize: {
                toggle: boolean;
                default: boolean;
                hoverable: boolean;
            };
        };
        footer: {
            self: {
                display: boolean
            }
        };
        menu: {
            dropdown: boolean;
                scroll: boolean;
                submenu: {
                    accordion: boolean;
                    dropdown: {
                    arrow: boolean;
                    "hover-timeout": number;
                }
            }
        };
    };
    footer: {
        width: string,
        fixed: boolean
    };
}
