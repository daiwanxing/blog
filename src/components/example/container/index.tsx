import style from "./index.module.scss";

const CSSContainerExample = () => {
  return (
    <div className={style["my-box"]}>
      <div className={style["child-element"]}></div>
    </div>
  );
};

export default CSSContainerExample;
