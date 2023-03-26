import { Link } from "react-router-dom";

export const Home = () => {
  const meetingId = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  return (
    <div>
      <h1>Welcome at meeting app Home page.</h1>

      <Link to={`meeting/${meetingId(3)}-${meetingId(3)}`}>Your Name</Link>
    </div>
  );
}
