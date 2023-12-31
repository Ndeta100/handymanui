// Import packages
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

// Import components
import JobCard from "../components/JobCard";
import ProposalCard from "../components/ProposalCard";
import Auth from "../utils/auth";

// Import queries
import { QUERY_USER_JOBS, QUERY_USER_PROPOSALS } from "../utils/queries";

// Import CSS
import "../assets/css/dashboard.css";

export default function Dashboard() {
	const jobsData = useQuery(QUERY_USER_JOBS);
	const proposalsData = useQuery(QUERY_USER_PROPOSALS);

	if (jobsData.loading) {
		return <p>Loading...</p>;
	}

	if (proposalsData.loading) {
		return <p>Loading...</p>;
	}

	const user = Auth.getUser();
	const userName = `${user.data.firstName} ${user.data.lastName}`;

	// Simplify variables for passing in as props
	const userJobs = jobsData.data.getUserJobs;
	const userProposals = proposalsData.data.getUserProposals;

	return (
		<section className="container">
			<h2>{userName} Dashboard</h2>
			<div className="row">
				{/* Your projects column */}
				<div className="col-md-6">
					<h3>Your Jobs</h3>
					{/* Set up route */}
					<Link className="btn btn-success" to="/createJob">
						<strong>Create New Job</strong>
					</Link>
					{
						// Since empty array doesn't  evaluate to falsy in JavaScript, but 0 does
						userJobs.length ? (
							<JobCard jobs={userJobs} />
						) : (
							<p>Awaiting your first job!</p>
						)
					}
				</div>

				{/* Your proposals column */}
				<div className="col-md-6">
					<h3>Your Proposals</h3>
					{
						// Since empty array doesn't evaluate to falsy in JavaScript, but 0 does
						userProposals.length ? (
							<ProposalCard proposals={userProposals} />
						) : (
							<p>Awaiting your first proposal!</p>
						)
					}
				</div>
			</div>
		</section>
	);
}
