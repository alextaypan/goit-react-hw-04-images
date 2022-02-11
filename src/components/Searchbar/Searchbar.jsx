import { toast } from "react-toastify";
import { Component } from "react";
import { FcSearch } from "react-icons/fc";
import s from "./Searchbar.module.css";

export class Searchbar extends Component {
  state = {
    query: "",
  };

  handleChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.query.trim() === "") {
      toast.warn(
        "The search string cannot be empty. Please specify your search query!"
      );
      return;
    }
    this.props.changeSearch(this.state.query);
    this.reset();
  };

  reset = () => {
    this.setState({ query: "" });
  };

  render() {
    const { query } = this.state;
    return (
      <>
        <header className={s.searchBar}>
          <form className={s.searchForm} onSubmit={this.handleSubmit}>
            <button type="submit" className={s.searchFormBtn}>
              <FcSearch className={s.reactIcon} />
            </button>

            <input
              className={s.searchFormInput}
              type="text"
              value={query}
              onChange={this.handleChange}
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </form>
        </header>
      </>
    );
  }
}
