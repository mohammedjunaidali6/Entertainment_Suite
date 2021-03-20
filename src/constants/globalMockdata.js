export const lineChartData = {
  labels: ['Jan 1', 'Jan 8', 'Jan 15', 'Jan 22', 'Feb 1', 'Feb 8', 'Feb 22', 'Mar 1', 'Mar 8'],
  datasets: [
    {
      label: 'Revenue',
      data: [12, 44, 10, 58, 35, 68, 48, 120, 57],
      fill: false,
      backgroundColor: '#3794FC',
      borderColor: '#3794FC',
      barThickness: 10
    },{
        label: 'Cost',
        data: [58, 84, 30, 88, 94, 87, 102, 135, 85],
        fill: false,
        backgroundColor: '#9D60FB',
        borderColor: '#9D60FB',
        barThickness: 10
    }
  ],
}

export const lineChartSingleData = {
  labels: ['Jan 1', 'Jan 8', 'Jan 15', 'Jan 22', 'Feb 1', 'Feb 8', 'Feb 22', 'Mar 1', 'Mar 8'],
  datasets: [
    {
      label: 'Revenue',
      data: [12, 44, 10, 78, 35, 68, 97, 120, 57],
      fill: false,
      backgroundColor: '#d7e6ff',
      borderColor: '#3794FC',
      barThickness: 30
    }
  ],
}

export const lineChartSingleBlueData = {
  labels: ['Jan 1', 'Jan 8', 'Jan 15', 'Jan 22', 'Feb 1', 'Feb 8', 'Feb 22', 'Mar 1', 'Mar 8'],
  datasets: [
    {
      label: 'Revenue',
      data: [12, 44, 10, 78, 35, 68, 97, 120, 57],
      fill: true,
      backgroundColor: '#d7e6ff',
      borderColor: '#3794FC',
      barThickness: 30
    }
  ],
}
export const lineChartSingleGreenData = {
  labels: ['Jan 1', 'Jan 8', 'Jan 15', 'Jan 22', 'Feb 1', 'Feb 8', 'Feb 22', 'Mar 1', 'Mar 8'],
  datasets: [
    {
      label: 'Revenue',
      data: [140, 44, 10, 78, 35, 68, 97, 120, 57],
      fill: true,
      backgroundColor: '#cffff6',
      borderColor: '#39DABC',
      barThickness: 30
    }
  ],
}
export const lineChartSinglePurpleData = {
  labels: ['Jan 1', 'Jan 8', 'Jan 15', 'Jan 22', 'Feb 1', 'Feb 8', 'Feb 22', 'Mar 1', 'Mar 8'],
  datasets: [
    {
      label: 'Revenue',
      data: [12, 44, 10, 78, 35, 68, 97, 120, 57],
      fill: true,
      backgroundColor: '#f5d8f7',
      borderColor: '#EF7DF7',
      barThickness: 30
    }
  ],
}
export const lineChartSingleOrangeData = {
  labels: ['Jan 1', 'Jan 8', 'Jan 15', 'Jan 22', 'Feb 1', 'Feb 8', 'Feb 22', 'Mar 1', 'Mar 8'],
  datasets: [
    {
      label: 'Revenue',
      data: [12, 44, 10, 78, 35, 68, 97, 120, 57],
      fill: true,
      backgroundColor: '#fbeccc',
      borderColor: '#FFAF00',
      barThickness: 30
    }
  ],
}

export const barChartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Coupons',
      data: [200, 354, 178, 194, 480, 140, 160],
      fill: false,
      backgroundColor: [
        '#3794FC',
        '#2D88EE',
        '#19C2A7',
        '#3794FC',
        '#EEB344',
        '#6BBBF3',
        '#3794FC',
      ],
      borderColor: [
        '#3794FC',
        '#2D88EE',
        '#19C2A7',
        '#3794FC',
        '#EEB344',
        '#6BBBF3',
        '#3794FC',
      ],
      barThickness: 50
    }
  ],
}

export const smallBarChartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Coupons',
      data: [500, 490, 505, 520, 540, 510, 500],
      fill: false,
      backgroundColor:'#3794FC',
      borderColor: '#3794FC',
      barThickness: 16
    }
  ],
}

export const doughnutChartData = {
  labels: ['Scratch', 'Shooting', 'Basketball', 'Card'],
  datasets: [
    {
      label: 'Revenue',
      data: [7090, 5668, 3677, 4830],
      fill: false,
      backgroundColor: [
        '#2D88EE',
        '#19C2A7',
        '#EEB344',
        '#6BBBF3'
      ],
      hoverBackgroundColor: [
        '#2D88EE',
        '#19C2A7',
        '#EEB344',
        '#6BBBF3'
      ]
    }
  ],
}

export const CampaignMockData = [
  { id: 1, offer: 'Win Rs.1000 Flat Discount', isRecent: true, customer: '120,124', sales: '34564', expiredOn: "31/02/21", status: "live", isRecent: false },
  { id: 2, offer: 'Win Rs.1000 Flat Discount', isRecent: true, customer: '120,124', sales: '34564', expiredOn: "31/02/21", status: "live", isRecent: false },
  { id: 3, offer: 'Win Rs.1000 Flat Discount', isRecent: true, customer: '120,124', sales: '34564', expiredOn: "31/02/21", status: "live", isRecent: false },
  { id: 4, offer: 'Win Rs.1000 Flat Discount', isRecent: true, customer: '120,124', sales: '34564', expiredOn: "31/02/21", status: "paused", isRecent: false },
  { id: 5, offer: 'Win Rs.1000 Flat Discount', isRecent: true, customer: '120,124', sales: '34564', expiredOn: "31/02/21", status: "expired", isRecent: false },
  { id: 6, offer: 'Win Rs.1000 Flat Discount', isRecent: true, customer: '120,124', sales: '34564', expiredOn: "31/02/21", status: "expired", isRecent: false },
  { id: 7, offer: 'Win Rs.1000 Flat Discount', isRecent: true, customer: '120,124', sales: '34564', expiredOn: "31/02/21", status: "upcoming", isRecent: false }
];

export const LiveViewCampaignMockData = [
  { id: 1, offer: 'Win Rs.1000 Flat Discount', isRecent: true, customer: '120,124', sales: '34564', expiredOn: "31/02/21", status: "live", isRecent: true },
  { id: 2, offer: 'Win Rs.1000 Flat Discount', isRecent: true, customer: '120,124', sales: '34564', expiredOn: "31/02/21", status: "live", isRecent: false },
  { id: 3, offer: 'Win Rs.1000 Flat Discount', isRecent: true, customer: '120,124', sales: '34564', expiredOn: "31/02/21", status: "live", isRecent: false },
  { id: 4, offer: 'Win Rs.1000 Flat Discount', isRecent: true, customer: '120,124', sales: '34564', expiredOn: "31/02/21", status: "paused", isRecent: false },
  { id: 5, offer: 'Win Rs.1000 Flat Discount', isRecent: true, customer: '120,124', sales: '34564', expiredOn: "31/02/21", status: "paused", isRecent: true },
  { id: 6, offer: 'Win Rs.1000 Flat Discount', isRecent: true, customer: '120,124', sales: '34564', expiredOn: "31/02/21", status: "paused", isRecent: false },
  { id: 7, offer: 'Win Rs.1000 Flat Discount', isRecent: true, customer: '120,124', sales: '34564', expiredOn: "31/02/21", status: "live", isRecent: false },
  { id: 8, offer: 'Win Rs.1000 Flat Discount', isRecent: true, customer: '120,124', sales: '34564', expiredOn: "31/02/21", status: "live", isRecent: false },
  { id: 9, offer: 'Win Rs.1000 Flat Discount', isRecent: true, customer: '120,124', sales: '34564', expiredOn: "31/02/21", status: "live", isRecent: false }
];