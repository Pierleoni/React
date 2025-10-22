import About from "./About";
import Home from "./Home";
import MyProfile from "./MyProfile";
import Profile from "./Profile";
import SingleProfile from "./SingleProfile";
import ErrorPage from "./ErrorPage";

export const routes = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/about",
        element: <About />,
    },
    {
        path: "/profiles/",
        element: <Profile />,
        children: [
        {
            path: ":id",
            element: <SingleProfile />,
        },
        {
            path: "me",
            element: <MyProfile />,
        },
        ],
    },
    {
        path: "*",
        element: <ErrorPage />,
    }
];