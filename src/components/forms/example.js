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
    (data) => console.log('submit', data)
  );
  return (
    <Card>
      <Form {...form}>
        <input {...name} />
        <input {...description} />
        <input {...email} />
        <input type="submit"/>
      </Form>
    </Card>
  )
};