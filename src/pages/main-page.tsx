import { useEffect } from "react";
import NavBar from "../components/nav-bar";
import { setFocusActions, setFocuses } from "../slices/focusSlice";
import { setTypes, setDurations } from "../slices/controlSlice";
import { createClient } from "@supabase/supabase-js";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import FocusList from "../components/focus-list";

const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);


const MainPage: React.FC = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const focusData = useSelector((state: RootState) => state.focus.focuses);
    const focusActionData = useSelector((state: RootState) => state.focus.focusActions);
    const dispatch = useDispatch();


    async function getControlValues(): Promise<{ types: any[], durations: any[] }> {
        const { data: types } = await supabase.from("focus_types").select();
        const { data: durations } = await supabase.from("focus_durations").select();
        return { types: types || [], durations: durations || [] };
    }

    async function getFocusData(): Promise<{ focuses: any[], focusActions: any[] }> {
        const { data: focuses } = await supabase.from("focuses").select().eq("created_by", user?.uid);
        const { data: focusActions } = await supabase.from("focus_actions").select().eq("id", user?.uid);;
        return { focuses: focuses || [], focusActions: focusActions || [] };
    }

    useEffect(() => {
        console.log("User: ", user!.uid)
        getControlValues()
            .then((res) => {
                console.log(res)
                dispatch(setTypes(res.types));
                dispatch(setDurations(res.durations));
            })
            .catch((err) => {
                console.error("Error fetching control values: ", err);
            });
    }, []);

    useEffect(() => {
        getFocusData()
            .then((res) => {
                console.log(res)
                dispatch(setFocuses(res.focuses));
                dispatch(setFocusActions(res.focusActions));
            })
            .catch((err) => {
                console.error("Error fetching focus data: ", err);
            });
    }, []);

    return (
        <>
            <div className="flex h-screen bg-linear-to-b from-blue-500 to-gray-500">
                <div className="fixed top-0 left-0 w-full z-10">
                    <NavBar />
                </div>
                <div className="mt-30 mx-10 ">
                    <FocusList
                        items={focusData}
                    />
                </div>
            </div>
        </>
    );
}


export default MainPage;