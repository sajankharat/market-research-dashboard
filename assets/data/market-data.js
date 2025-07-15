// Market Research Dashboard Data
const marketData = {
    // Industry Trends Data
    industryTrends: {
        revenue: [
            { year: 2019, value: 125.4, growth: 8.2 },
            { year: 2020, value: 118.7, growth: -5.3 },
            { year: 2021, value: 142.3, growth: 19.9 },
            { year: 2022, value: 156.8, growth: 10.2 },
            { year: 2023, value: 171.2, growth: 9.2 },
            { year: 2024, value: 185.6, growth: 8.4 }
        ],
        marketSize: {
            total: 185.6,
            segments: [
                { name: 'Enterprise', value: 78.4, percentage: 42.3 },
                { name: 'SMB', value: 55.7, percentage: 30.0 },
                { name: 'Consumer', value: 51.5, percentage: 27.7 }
            ]
        },
        emergingTrends: [
            { trend: 'AI Integration', impact: 85, adoption: 67 },
            { trend: 'Remote Work Solutions', impact: 78, adoption: 82 },
            { trend: 'Sustainability Focus', impact: 72, adoption: 45 },
            { trend: 'Mobile-First Approach', impact: 88, adoption: 91 },
            { trend: 'Data Privacy', impact: 79, adoption: 58 }
        ]
    },

    // Customer Segments Data
    customerSegments: {
        demographics: [
            { segment: 'Tech Innovators', size: 23, revenue: 45.2, satisfaction: 4.6, churn: 8.2 },
            { segment: 'Traditional Enterprises', size: 35, revenue: 67.8, satisfaction: 4.1, churn: 12.5 },
            { segment: 'Growing SMBs', size: 28, revenue: 38.9, satisfaction: 4.3, churn: 15.8 },
            { segment: 'Price-Conscious Users', size: 14, revenue: 18.7, satisfaction: 3.8, churn: 22.1 }
        ],
        behaviorPatterns: {
            purchaseFrequency: [
                { segment: 'Tech Innovators', monthly: 2.3, quarterly: 1.8, annual: 0.9 },
                { segment: 'Traditional Enterprises', monthly: 0.8, quarterly: 2.1, annual: 1.2 },
                { segment: 'Growing SMBs', monthly: 1.4, quarterly: 1.6, annual: 0.7 },
                { segment: 'Price-Conscious Users', monthly: 0.6, quarterly: 1.2, annual: 0.4 }
            ],
            channelPreference: [
                { channel: 'Direct Sales', percentage: 42 },
                { channel: 'Online Self-Service', percentage: 28 },
                { channel: 'Partner Channel', percentage: 18 },
                { channel: 'Marketplace', percentage: 12 }
            ]
        }
    },

    // Competitive Landscape Data
    competitiveLandscape: {
        marketShare: [
            { company: 'Our Company', share: 18.5, revenue: 34.3, growth: 12.4 },
            { company: 'Competitor A', share: 24.2, revenue: 44.9, growth: 8.7 },
            { company: 'Competitor B', share: 16.8, revenue: 31.2, growth: 15.2 },
            { company: 'Competitor C', share: 12.3, revenue: 22.8, growth: 6.9 },
            { company: 'Others', share: 28.2, revenue: 52.4, growth: 9.1 }
        ],
        competitorAnalysis: [
            {
                name: 'Competitor A',
                strengths: ['Market Leader', 'Strong Brand', 'Enterprise Focus'],
                weaknesses: ['High Prices', 'Slow Innovation', 'Poor SMB Support'],
                marketPosition: 'Leader',
                threatLevel: 'High'
            },
            {
                name: 'Competitor B',
                strengths: ['Innovative Features', 'Competitive Pricing', 'Fast Growth'],
                weaknesses: ['Limited Enterprise Features', 'New Brand', 'Support Issues'],
                marketPosition: 'Challenger',
                threatLevel: 'Medium'
            },
            {
                name: 'Competitor C',
                strengths: ['Niche Expertise', 'Strong Partnerships', 'Loyal Customers'],
                weaknesses: ['Limited Scale', 'Narrow Focus', 'Resource Constraints'],
                marketPosition: 'Niche Player',
                threatLevel: 'Low'
            }
        ],
        swotAnalysis: {
            strengths: [
                'Innovative Technology Stack',
                'Strong Customer Relationships',
                'Agile Development Process',
                'Competitive Pricing Model'
            ],
            weaknesses: [
                'Limited Brand Recognition',
                'Smaller Market Share',
                'Resource Constraints',
                'Geographic Limitations'
            ],
            opportunities: [
                'Emerging Market Expansion',
                'AI/ML Integration',
                'Strategic Partnerships',
                'New Product Categories'
            ],
            threats: [
                'Increased Competition',
                'Economic Downturn',
                'Regulatory Changes',
                'Technology Disruption'
            ]
        }
    },

    // Key Performance Indicators
    kpis: {
        current: [
            { metric: 'Market Share', value: '18.5%', change: '+2.3%', trend: 'up' },
            { metric: 'Revenue Growth', value: '12.4%', change: '+1.8%', trend: 'up' },
            { metric: 'Customer Satisfaction', value: '4.2/5', change: '+0.1', trend: 'up' },
            { metric: 'Churn Rate', value: '14.2%', change: '-1.5%', trend: 'down' },
            { metric: 'Market Penetration', value: '8.7%', change: '+0.9%', trend: 'up' },
            { metric: 'Competitive Position', value: '#3', change: '+1', trend: 'up' }
        ]
    },

    // Regional Data
    regionalData: [
        { region: 'North America', revenue: 78.4, growth: 8.9, marketShare: 22.1 },
        { region: 'Europe', revenue: 52.3, growth: 11.2, marketShare: 16.8 },
        { region: 'Asia Pacific', revenue: 38.7, growth: 18.5, marketShare: 12.4 },
        { region: 'Latin America', revenue: 12.1, growth: 15.3, marketShare: 8.9 },
        { region: 'Middle East & Africa', revenue: 4.1, growth: 22.7, marketShare: 5.2 }
    ]
};

// Export for use in dashboard
if (typeof module !== 'undefined' && module.exports) {
    module.exports = marketData;
}