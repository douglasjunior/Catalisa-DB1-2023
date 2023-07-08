import { Form, Input } from 'antd';
import { useState } from 'react';

const InputText = (props) => {
  const { label, onChange, validate, ...others } = props;
  const [errorMessage, setErrorMessage] = useState(null);
  const [changed, setChanged] = useState(null);

  const validateStatus = errorMessage ? 'error' : 'success';

  const handleValidation = (event) => {
    setChanged(true);

    if (validate) {
      setErrorMessage(validate(event.target.value));
    }

    onChange(event);
  };

  return (
    <Form.Item
      validateStatus={validateStatus}
      label={label}
      help={errorMessage}
      hasFeedback={changed}
    >
      <Input {...others} onChange={handleValidation} suffix={<span />} />
    </Form.Item>
  );
}

export default InputText;
