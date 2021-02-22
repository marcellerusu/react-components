import SideNav, {Header, Section, Item, Container} from '.';

const SideNavExample = () => (
  <Container>
    <SideNav>
      <Header>
        Welcome to my examples!
      </Header>
      <Section title="Enlightenment">
        <Item>
          <a href="#">Step 1</a>
        </Item>
        <Item>
          <a href="#">Step 2</a>
        </Item>
        <Item>
          <a href="#">Step 3</a>
        </Item>
        <Item>
          <a href="#">Step 4</a>
        </Item>
      </Section>
      <Section title="Now what?">
        <Item>
          <a href="#">Relax</a>
        </Item>
        <Item>
          <a href="#">Save the world</a>
        </Item>
      </Section>
    </SideNav>
    <div>
      blayh blah
    </div>
  </Container>
);

export default SideNavExample;