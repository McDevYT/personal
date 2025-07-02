function IFrame(props: { src: string }) {
    return <iframe style={{ width: '100%', height: '100%' }} src={props.src} />;
}
export default IFrame;
