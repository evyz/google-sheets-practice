import "./button.css"
function SystemButton({ children, onClick }){
    return(
        <button class="btn btn-success" onClick={onClick}>
            {children }
        </button>
    )
}
export default SystemButton;