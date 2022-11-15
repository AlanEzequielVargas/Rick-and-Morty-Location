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

	return (
		<>
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

					<div className="input">
						<input
							type="text"
							placeholder="type a location id (1-126)"
							onChange={(e) =>
								setInputValue(e.target.value)
							}
						/>
						<button onClick={searchLocation}>Search</button>
					</div>

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
				</>
			)}
		</>
	);
};

export default Location;
