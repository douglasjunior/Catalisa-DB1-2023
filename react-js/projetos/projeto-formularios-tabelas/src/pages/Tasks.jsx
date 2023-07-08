import { useEffect, useMemo, useState } from 'react';

import axios from 'axios';
import { Col, Form, Row } from 'antd';
import TaskItem from '../components/TaskItem';
import InputText from '../components/InputText';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        const { data } = response;
        setTasks(data);
      })
      .catch(err => {
        console.warn(err)
      })

  }, [])

  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const filteredTasks = useMemo(() => {
    if (!search) return tasks;
    return tasks.filter(task => task.title.includes(search))
  }, [search, tasks]);

  const renderTask = (task) => {
    return (
      <TaskItem task={task} key={task.id} />
    )
  }

  const validateInputSearch = (value) => {
    return value && value.length > 10
      ? 'O termo de busca deve possui no máximo 10 caracteres.'
      : undefined;
  }

  return (
    <div>
      <Row gutter={[24, 24]}>
        <Col span="23">
          <Form layout="vertical">
            <InputText
              label="Busca de tarefas"
              placeholder="Buscar por título"
              value={search}
              onChange={handleSearch}
              validate={validateInputSearch}
            />
          </Form>
        </Col>
      </Row>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Concluído</th>
          </tr>
        </thead>

        <tbody>
          {filteredTasks.map(renderTask)}
        </tbody>
      </table>
    </div>
  );
}

export default Tasks;
