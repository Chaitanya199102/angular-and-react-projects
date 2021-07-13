export const mockFormTemplate = {
    name: 'form',
    sections: [
        {
            name: 'personalDetails',
            title: 'Personal Details',
            order: 1,
            questions: [
                {   id: 1, name: 'ques1', title: 'Name', type: 'text', 
                    validators: [{name: 'required', value: 'true'}]
                },
                {id: 2, name: 'ques2', title: 'Address', type: 'text'},
                {id: 4, name: 'ques6', title: 'Age', type: 'text', 
                    validators: [{name: 'required', value: 'true'}]
                },
            ]
        },
        {
            name: 'employerDetails',
            title: 'Employer Details',
            order: 2,
            questions: [
                {   id: 5, name: 'ques4', title: 'Employer Name', type: 'text',
                    validators: [{name: 'required', value: 'true'}]
                },
                {id: 7, name: 'ques7', title: 'Salary', type: 'text',
                    validators: [
                        {name: 'required', value: 'true'},
                        {name: 'dependsOn', value: 'ques6', expression: '${ques6} < 18'}
                    ]
                }
            ]
        }
        /*,
        {
            name: 'previousEmployerDetails',
            title: 'Previous Employer Details',
            order: 2,
            questions: [
                {   id: 5, name: 'ques8', title: 'Employer Name', type: 'text',
                    validators: [{name: 'required', value: 'true'}]
                },
                {id: 6, name: 'ques9', title: 'Job Designation', type: 'text'},
                {id: 7, name: 'ques10', title: 'Salary', type: 'text',
                    validators: [
                        {name: 'dependsOn', value: 'ques6', expression: '${ques6} < 18'}
                    ]
                }
            ]
        }*/
    ]
};