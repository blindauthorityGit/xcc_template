export default function Button(props) {
    return (
        <div
            className={`${props.data[props.index].button_settings.box ? "col-6" : "col-12"} py-2 ${
                props.index % 2 === 0 ? "slide-in-left" : "slide-in-right"
            } `}
        >
            <div
                className={`${
                    props.e.button_settings.colorlist.title === "Blau" ||
                    props.e.button_settings.colorlist.title === "Schwarz" ||
                    props.e.button_settings.colorlist.title === "Rot"
                        ? "bright-text"
                        : "dark-text"
                } ${
                    props.e.button_settings.border ? "border-button" : ""
                } box p-2 d-flex justify-content-center align-items-center`}
                data-id={props.index}
                data-cat={props.cat}
                key={props.index}
                style={{
                    background: props.e.button_settings.colorlist.value,
                }}
                onClick={props.modal}
            >
                {props.e.button_settings.icon && <i class={props.icon}></i>}
                <h2 data-id={props.index} onClick={props.modal}>
                    {props.data[props.index].button_settings.titel}
                </h2>
            </div>
        </div>
    );
}
