import { render } from "./editorActions";

import * as types from "../constants/ActionTypes";

import * as sceneActions from "./sceneActions";

const refExRef = "/apiv1/referenceExamples/";
const header = { headers: { "content-type": "application/json" } };
const problem = {
    functionName: "Error",
    functionParams: [],
    type: "Error",
    info: "An unknown error occurred. Please try refreshing the page.",
    suggestedCourse: null,
    code: ""
};

const notFound = {
    functionName: "Not Found",
    functionParams: [],
    type: "Error 404",
    info: "The function example you are trying to view is not currently defined.",
    suggestedCourse: null,
    code: ""
};

//Lesson Actions
export function fetchReferenceExample(funcName) {
    return (dispatch) => {
        fetch(refExRef + funcName, header)
            .then(response => {
                response.json()
                    .then(json => {
                        dispatch(loadReferenceExample(response.status === 200 ? json : notFound));
                        dispatch(render(json.code || ""));
                        dispatch(sceneActions.setNameDesc(
                            {
                                name: json.functionName,
                                desc: "This scene was saved from the reference example: " + json.functionName,
                            }));
                    })
                    .catch(err => {
                        dispatch(loadReferenceExample(problem));
                        console.error(err);
                    });
            })
            .catch(err => {
                dispatch(loadReferenceExample(problem));
                console.error(err);
            });
    };
}

export function loadReferenceExample(refEx) {
    return {
        type: types.LOAD_REF_EX,
        payload: refEx
    };
}

export default {
    loadReferenceExample,
    fetchReferenceExample
};