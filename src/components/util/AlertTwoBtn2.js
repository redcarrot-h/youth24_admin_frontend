import { AlertArea } from "style/StylePopup";

const AlertTwoBtn2 = (props) => {
  return (
    <>
      <AlertArea>
        <div className="alert_box">
          {props.text}
          <a onClick={() => props.offAlert(false)}>{props.btnOneText}</a>
          <a onClick={props.func}>{props.btnTwoText}</a>
        </div>
      </AlertArea>
    </>
  );
};

export default AlertTwoBtn2;
