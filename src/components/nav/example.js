import Nav, {Item} from '.';

const NavExample = () => {
  return (
    <div>
      <Nav>
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
      </Nav>
      <div style={{height: '200vh'}}>
        A lot of text
      </div>
    </div>
  );
};

export default NavExample;