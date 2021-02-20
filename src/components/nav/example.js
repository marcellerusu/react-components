import Nav, {List, Item} from '.';

export default () => {
  return (
    <Nav>
      <List>
        <Item>
          <a>Home</a>
        </Item>
        <Item>
          TV Shows
        </Item>
        <Item>
          Movies
        </Item>
        <Item>
          New & Popular
        </Item>
        <Item>
          My List
        </Item>
      </List>
    </Nav>
  );
};