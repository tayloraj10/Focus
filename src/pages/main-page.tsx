import { useEffect } from "react";
import NavBar from "../components/nav-bar";
import { setFocusActions, setFocuses } from "../slices/focusSlice";
import { setTypes, setDurations, setOptions } from "../slices/controlSlice";
import { supabaseConnection } from '../supabase/supabaseClient';
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import FocusList from "../components/focus-list";


const MainPage: React.FC = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const focusData = useSelector((state: RootState) => state.focus.focuses);
    // const focusActionData = useSelector((state: RootState) => state.focus.focusActions);
    const dispatch = useDispatch();


    supabaseConnection.channel('realtime:focuses').on('postgres_changes', { event: '*', schema: 'public', table: 'focuses' }, _payload => {
        // console.log(payload)
        loadFocusData();
    }).subscribe()

    supabaseConnection.channel('realtime:actions').on('postgres_changes', { event: '*', schema: 'public', table: 'focus_actions' }, _payload => {
        // console.log(payload)
        loadFocusData();
    }).subscribe()

    async function getControlValues(): Promise<{ types: any[], durations: any[], options: any[] }> {
        const { data: types } = await supabaseConnection.from("focus_types").select();
        const { data: durations } = await supabaseConnection.from("focus_durations").select();
        const { data: options } = await supabaseConnection.from("focus_options").select();
        return { types: types || [], durations: durations || [], options: options || [] };
    }

    function loadFocusData() {
        getFocusData()
            .then((res) => {
                // console.log(res)
                dispatch(setFocuses(res.focuses));
                dispatch(setFocusActions(res.focusActions));
            })
            .catch((err) => {
                console.error("Error fetching focus data: ", err);
            });
    }

    async function getFocusData(): Promise<{ focuses: any[], focusActions: any[] }> {
        const { data: focuses } = await supabaseConnection.from("focuses").select().eq("created_by", user?.uid);
        const { data: focusActions } = await supabaseConnection.from("focus_actions").select().eq("id", user?.uid);;
        return { focuses: focuses || [], focusActions: focusActions || [] };
    }

    useEffect(() => {
        getControlValues()
            .then((res) => {
                // console.log(res)
                dispatch(setTypes(res.types));
                dispatch(setDurations(res.durations));
                dispatch(setOptions(res.options));
            })
            .catch((err) => {
                console.error("Error fetching control values: ", err);
            });
    }, []);

    useEffect(() => {
        loadFocusData();
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