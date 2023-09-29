const Alert = (props) => {
  return (
    <>
      <div>
        <p>{props.text}</p>
        <button onClick={() => props.offAlert(false)}>{props.btntext}</button>
        {/* <button onClick={() => props.func()}>
          test : 값으로 함수를 보낼 수 있을까?
        </button> */}
      </div>
    </>
  );
};

export default Alert;
