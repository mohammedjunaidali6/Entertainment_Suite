export const lineChartData = {
    labels: ['Jan 1', 'Jan 8', 'Jan 15', 'Jan 22', 'Feb 1', 'Feb 8', 'Feb 22', 'Mar 1', 'Mar 8'],
    datasets: [
      {
        label: 'Revenue',
        data: [12, 44, 10, 78, 35, 68, 97, 120, 57],
        fill: false,
        backgroundColor: '#3794FC',
        borderColor: '#3794FC',
      },{
          label: 'Cost',
          data: [47, 14, 57, 88, 24, 97, 68, 39, 85],
          fill: false,
          backgroundColor: '#9D60FB',
          borderColor: '#9D60FB',
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