function Header() {
  return (
    <div>
      <SocialMedia />
      <MainHeader />
    </div>
  );
}

export default Header;

function SocialMedia() {
  return (
    <div>
      <div className="header-social-media">
        <div className="header-social-media-left">
          <p>email:</p>
          <p>phone no</p>
          <p>icons</p>
        </div>
        <div className="header-social-media-right">
          <select>language</select>
          <p>subscribe now</p>
        </div>
      </div>
      <div className="burger"></div>
      <div className="burger"></div>
      <div className="burger"></div>
      <div className="burger"></div>
    </div>
  );
}

function MainHeader() {}
