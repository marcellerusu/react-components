import styled from 'styled-components';

import useForm, {Email, CustomType} from '.';

const Card = styled.div`
  margin: 20%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Name = CustomType(value => value.split(' '), arr => arr.join(' '));

export default () => {
  const [{name, description, email}, form] = useForm(
    {name: Name.of(''), description: '', email: Email.of('')},
    x => console.log(x)
  );
  return (
    <Card>
      <Form {...form}>
        <label {...name.label}></label>
        <input {...name} />
        <label {...description.label}></label>
        <input {...description} />
        <label {...email.label}></label>
        <input {...email} />
        <input type="submit"/>
      </Form>
    </Card>
  )
};