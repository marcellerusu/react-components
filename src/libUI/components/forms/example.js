import styled from '../../styled';
import {dom, Component} from '../../';

import useForm, {Email, CustomType} from '.';

const Card = styled.div`
  margin: 20%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Name = CustomType(
  value => value.split(' '),
  arr => arr.join(' ')
);

// <FormExample>
// 
//  

const FormExample = Component(({useState}) => {
  const [{name, description, email}, form] = useForm(
    {name: Name.of(''), description: '', email: Email.of('')},
    x => console.log(x),
    useState
  );
  const [a, setA] = useState(1);
  const [b, setB] = useState(false);
  console.log(description);
  return (
    Card()(
      Form(form)(
        dom.label(name.label)(),
        dom.input(name)(),
        dom.label(description.label)(),
        dom.input(description)(),
        dom.label(email.label)(),
        dom.input(email)(),
        dom.input({type: 'submit'})()
      )
    )
  );
});

export default FormExample;