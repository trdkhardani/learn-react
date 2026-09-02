import "./App.css";

function Info({ follow, onFollow }) {
  return (
    <>
      <h1>Tridiktya</h1>
      <p>
        <strong>Backend Developer</strong>
      </p>
      <br />
      <p>"Building things, breaking things, then figuring out why."</p>
      <button onClick={onFollow}>{follow ? 'Following' : 'Follow'}</button>
    </>
  );
}

export default Info;
