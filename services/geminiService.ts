import type { Preview } from '../types';

// --- AI has been replaced with a mock service to remove API costs ---

const bio = "Experienced Data and Reporting Analyst specializing in leveraging data to drive business process improvement and automation. Proficient in Python, SQL, and Power BI.";

export const generateBio = (): string => {
    return bio;
};

// --- Mock Chat Functionality ---

const mockResponses: { keywords: string[], response: any }[] = [
    {
        keywords: ['procurement', 'dashboard', 'project 1', 'first project'],
        response: {
            text: "Sure, here are the details on my procurement analytics dashboard project.",
            projectId: 1,
        }
    },
    {
        keywords: ['data quality', 'pipeline', 'automation', 'project 2', 'second project'],
        response: {
            text: "Of course. Here is the project where I built a data quality automation pipeline.",
            projectId: 2,
        }
    },
    {
        keywords: ['powerapp', 'onboarding', 'project 3', 'third project'],
        response: {
            text: "Here you go. This PowerApp was designed to streamline vendor onboarding.",
            projectId: 3,
        }
    },
    {
        keywords: ['sql', 'code', 'database'],
        response: {
            text: "I enjoy writing clean and efficient SQL. Here's an example of a query I might write to analyze vendor performance.",
            preview: {
                summary: "Example SQL query for vendor performance analysis.",
                contentType: 'code',
                content: `
SELECT
    v.VendorName,
    COUNT(po.PurchaseOrderID) AS NumberOfOrders,
    SUM(po.OrderTotal) AS TotalSpend,
    AVG(DATEDIFF(day, po.OrderDate, pr.ReceiptDate)) AS AvgDeliveryDays
FROM
    Vendors v
JOIN
    PurchaseOrders po ON v.VendorID = po.VendorID
LEFT JOIN
    ProductReceipts pr ON po.PurchaseOrderID = pr.PurchaseOrderID
WHERE
    po.OrderDate >= '2023-01-01'
GROUP BY
    v.VendorName
ORDER BY
    TotalSpend DESC;
`
            }
        }
    },
    {
        keywords: ['skills', 'technical', 'experience', 'tools'],
        response: {
            text: "I'm proficient in Python (Pandas, NumPy), SQL, and DAX. My main tools are Power BI for visualization, Azure for pipelines, and the Power Platform for automation. You can see a more detailed breakdown in the 'Technical Skills' tab!"
        }
    },
    {
        keywords: ['contact', 'email', 'connect', 'reach out'],
        response: {
            text: "I'd love to connect! You can find my contact information on this page, or simply send me an email at ryan.sample.dev@email.com."
        }
    },
    {
        keywords: ['hello', 'hi', 'hey'],
        response: {
            text: "Hello! I'm Ryan's AI assistant. Feel free to ask me about his projects, skills, or experience. For example, you can say 'show me the procurement dashboard'."
        }
    }
];

const defaultResponse = {
    text: "That's a great question! I'm a portfolio assistant with a focused knowledge base on Ryan's work. For more general topics, Ryan would be happy to chat with you directly. You can find his contact details on the site.",
    sources: []
};

export const chatWithRyanAI = async (message: string): Promise<{ text: string, sources: Array<{ uri: string, title: string }>, preview?: Preview, projectId?: number }> => {
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));

    const lowerCaseMessage = message.toLowerCase();

    for (const item of mockResponses) {
        for (const keyword of item.keywords) {
            if (lowerCaseMessage.includes(keyword)) {
                // Return a copy to prevent mutation if the response object is reused
                return { ...JSON.parse(JSON.stringify(item.response)), sources: [] };
            }
        }
    }

    return defaultResponse;
};