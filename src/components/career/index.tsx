import style from "./career.module.scss";

interface CareerComponentProps {
  companyName: string;
  workBeginTime: string;
  workEndTime: string;
  jobName: string;
  mainTasks: string[];
}

function Career(props: CareerComponentProps) {
  return (
    <div className={style["carrer-card"]}>
      <h5>{props.jobName}</h5>
      <div className={style["workExp-company"]}>
        <span>
          {props.companyName}，{props.workBeginTime} - {props.workEndTime}
        </span>
      </div>
      <ul className={style["task-container"]}>
        {props.mainTasks.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Career;
