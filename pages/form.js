import utilStyles from "../styles/utils.module.css";
export default function EmailForm({ onSubmit }) {
  return (
    <form onSubmit={onSubmit} className={utilStyles.emailForm}>
      <input type="email" name="email" id="email" />
      <input type="submit" id="submit-btn" />
    </form>
  );
}
