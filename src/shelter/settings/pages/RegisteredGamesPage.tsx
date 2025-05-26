const {
    ui: { Header, HeaderTags, Divider },
} = shelter;

export function RegisteredGamesPage() {
    return (
        <>
            <Header tag={HeaderTags.H1}>Registered Games</Header>
            <Divider mt mb />
        </>
    );
}
