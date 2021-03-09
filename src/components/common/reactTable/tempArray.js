
import ActionMenu from "./menu";


 export const segmentColumns = [
        {
            name: "Segment Name",
            selector: "segName"
        },
        {
            name: "Customer Type",
            selector: "customerType"
        },
        {
            name: "Filters Applied",
            selector: "filtersApplied"
        },
        {
            name: "Gender",
            selector: "gender"
        },
        {
            name: "Age",
            selector: "age"
        },
        {
            name: "Location",
            selector: "location",
           
        },
        {
            name: "Action",
             cell: row => <ActionMenu />
        }
    ]

export const segmentData = [
        {
            segName: "First Purchase User 1",
            customerType: "All customer",
            filtersApplied: "3 filters",
            gender: "Male",
            age: "20-30",
            location: "Banglore"
        },
        {
            segName: "First Purchase User 2",
            customerType: "Inactive customer",
            filtersApplied: "5 filters",
            gender: "All",
            age: "15-25",
            location: "Mumbai"
        },
        {
            segName: "First Purchase User 3",
            customerType: "High value customers",
            filtersApplied: "6 filters",
            gender: "All",
            age: "15-90",
            location: "India"
        },
        {
            segName: "First Purchase User 4",
            customerType: "inactive customer",
            filtersApplied: "3 filters",
            gender: "All",
            age: "20-40",
            location: "India"
        }
    ]
