const TaskItem = (props) => {
  const { task } = props;

  return (
    <tr>
      <td>{task.id}</td>
      <td>{task.title}</td>
      <td>
        {task.completed ? '✔' : '❌'}
      </td>
    </tr>
  );
};


export default TaskItem;
