import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import LocationInfo from "./LocationInfo";
import ResidentInfo from "./ResidentInfo";

const Location = ({ spinner }) => {
	const [location, setLocation] = useState({});

	const randomNumber = Math.floor(Math.random() * 126) + 1;

	const [inputValue, setInputValue] = useState("");

	const [isLoading, setIsLoading] = useState(true);

	const [suggestions, setSuggestions] = useState([]);

	useEffect(() => {
		axios.get(
			`https://rickandmortyapi.com/api/location/${randomNumber}`
		).then((res) => setLocation(res.data), setIsLoading(false));
	}, []);

	function searchLocation(e) {
		axios.get(
			`https://rickandmortyapi.com/api/location/${inputValue}`
		).then((res) => setInputValue(res.data), setIsLoading(false));
		setPage(1);
	}

	useEffect(() => {
		if (inputValue) {
			axios.get(
				`https://rickandmortyapi.com/api/location?name=${inputValue}`
			).then((res) => setSuggestions(res.data.results));
		} else {
			setSuggestions([]);
		}
	}, [inputValue]);

	const suggestionsCropped = suggestions.slice(0, 7);

	const [page, setPage] = useState(1);
	const characterPerPage = 9;
	const lastIndex = page * characterPerPage;
	const firstIndex = lastIndex - characterPerPage;

	const characterPaginated = location.residents?.slice(
		firstIndex,
		lastIndex
	);
	const characterPaginatedInput = inputValue.residents?.slice(
		firstIndex,
		lastIndex
	);

	const totalPages = Math.ceil(
		location.residents?.length / characterPerPage
	);
	const totalPagesInput = Math.ceil(
		inputValue.residents?.length / characterPerPage
	);

	const numbers = [];
	for (let i = 1; i <= totalPages; i++) {
		numbers.push(i);
	}
	const numbersInput = [];
	for (let i = 1; i <= totalPagesInput; i++) {
		numbersInput.push(i);
	}

	const [showSug, setShowSug] = useState(true);

	return (
		<>
			<div className="input">
				<input
					type="text"
					placeholder="Write a name"
					onChange={(e) => {
						setInputValue(e.target.value);
						setShowSug(true);
					}}
				/>
				<button
					onClick={() => {
						searchLocation;
						setShowSug(false);
					}}
				>
					Search
				</button>
        {inputValue != "" && (
				<ul
					className="suggestions-list"
					style={{ display: showSug ? "" : "none" }}
				>
					{suggestionsCropped.map((sug) => (
						<li
							onClick={() => {
								setInputValue(sug);
								setShowSug(false);
							}}
						>
							{sug.name}
						</li>
					))}
				</ul>
			)}
			</div>

			

			{isLoading ? (
				<img className="portal-spinner" src={spinner} alt="" />
			) : (
				<>
					{inputValue ? (
						<div className="search-section">
							<LocationInfo location={inputValue} />
						</div>
					) : (
						<div className="search-section">
							<LocationInfo location={location} />
						</div>
					)}

					
          <div className="characters-container">
            {inputValue
						? /* inputValue.residents? */ characterPaginatedInput?.map(
								(resident) => (
									<div key={resident}>
										<ResidentInfo
											url={resident}
										/>
									</div>
								)
						  )
						: /* location.residents? */ characterPaginated?.map(
								(resident) => (
									<div key={resident}>
										<ResidentInfo
											url={resident}
										/>
									</div>
								)
						  )}
          </div>
          {inputValue ? (
						<div className="pag-navigator">
							<button
								className="nav-pag-btn"
								onClick={() => setPage(page - 1)}
								disabled={page === 1}
							>
								Prev Page
							</button>

							<div className="pag-numbers">
								{numbersInput.map((num) => (
									<button
										key={num}
										onClick={() => setPage(num)}
									>
										{num}
									</button>
								))}
							</div>

							<button
								className="nav-pag-btn"
								onClick={() => setPage(page + 1)}
								disabled={page === totalPages}
							>
								Next Page
							</button>
						</div>
					) : (
						<div className="pag-navigator">
							<button
								className="nav-pag-btn"
								onClick={() => setPage(page - 1)}
								disabled={page === 1}
							>
								Prev Page
							</button>

							<div className="pag-numbers">
								{numbers.map((num) => (
									<button
										key={num}
										onClick={() => setPage(num)}
									>
										{num}
									</button>
								))}
							</div>

							<button
								className="nav-pag-btn"
								onClick={() => setPage(page + 1)}
								disabled={page === totalPages}
							>
								Next Page
							</button>
						</div>
					)}
					
				</>
			)}
		</>
	);
};

export default Location;
