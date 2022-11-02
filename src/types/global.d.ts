declare module NodeJS {
    interface Global {
        logger: NonNullable<
            Readonly<{
                warn: (args: unknown) => void;
                info: (args: unknown) => void;
                error: (args: unknown) => void;
                debug: (args: unknown) => void;
            }>
        >;
        isProduction: boolean;
    }
}
