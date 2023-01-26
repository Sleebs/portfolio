import PropicImg from "./img/propic.png";

export function PresentationCard(props) {
  return (
    <div className='card-section'>
      <div className='presentation-card'>
        <img src={PropicImg}></img>
        <div>
          <p>
            I'm a developer and computer science student who has been building
            since 2017. My passion for coding and making creative experiences
            has led me to this moment!
            <br />
            Here are a few technologies I've been working with recently:
          </p>
          <ul>
            <li>JavaScript ( ES6+) </li>
            <li>React</li>
            <li>Node js</li>
            <li>python</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
