import Nav, {List, Item} from '.';

export default () => {
  return (
    <div>
      <Nav>
        <List>
          <Item>
            <a href="#">Home</a>
          </Item>
          <Item>
            <a href="#">TV Shows</a>
          </Item>
          <Item>
            <a href="#">Movies</a>
          </Item>
          <Item>
            <a href="#">New & Popular</a>
          </Item>
          <Item>
            <a href="#">My List</a>
          </Item>
        </List>
      </Nav>
      <div style={{height: '200vh'}}>
        A lot of text
      </div>
    </div>
  );
};