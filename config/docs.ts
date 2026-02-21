export interface NavItem {
    title: string;
    href?: string;
    items?: NavItem[];
}

export interface DocsConfig {
    mainNav: NavItem[];
    sidebarNav: NavItem[];
}

export const docsConfig: DocsConfig = {
    mainNav: [
        { title: "Handbook", href: "/docs" },
    ],
    sidebarNav: [
        {
            title: "1. Data Structures & Algorithms",
            items: [
                { title: "Big-O Notation", href: "/docs/dsa/big-o" },
                { title: "Space vs Time Tradeoffs", href: "/docs/dsa/space-time-tradeoffs" },
                { title: "Arrays & Strings", href: "/docs/dsa/arrays" },
                { title: "Linked Lists", href: "/docs/dsa/linked-lists" },
                { title: "Stack & Queue", href: "/docs/dsa/stack-queue" },
                { title: "HashMap & Set", href: "/docs/dsa/hashmap-set" },
                { title: "Trees", href: "/docs/dsa/trees" },
                { title: "Heaps", href: "/docs/dsa/heaps" },
                { title: "Graphs", href: "/docs/dsa/graphs" },
                { title: "Trie", href: "/docs/dsa/trie" },
                { title: "Union-Find", href: "/docs/dsa/union-find" },
                { title: "LRU Cache", href: "/docs/dsa/lru-cache" },
                { title: "Sorting", href: "/docs/dsa/sorting" },
                { title: "Binary Search", href: "/docs/dsa/binary-search" },
                { title: "Sliding Window", href: "/docs/dsa/sliding-window" },
                { title: "Two Pointers", href: "/docs/dsa/two-pointers" },
                { title: "Greedy", href: "/docs/dsa/greedy" },
                { title: "Dynamic Programming", href: "/docs/dsa/dynamic-programming" },
                { title: "BFS & DFS", href: "/docs/dsa/bfs-dfs" },
                { title: "Dijkstra", href: "/docs/dsa/dijkstra" },
                { title: "String Matching", href: "/docs/dsa/string-matching" },
            ],
        },
        {
            title: "2. Frontend",
            items: [
                { title: "HTML Core Concepts", href: "/docs/frontend/html-core" },
                { title: "Document Structure Tags", href: "/docs/frontend/html-structure" },
                { title: "Semantic HTML", href: "/docs/frontend/html-semantic" },
                { title: "Text & Media Elements", href: "/docs/frontend/html-text-media" },
                { title: "HTML Forms", href: "/docs/frontend/html-forms" },
                { title: "Accessibility (a11y)", href: "/docs/frontend/html-accessibility" },
                { title: "CSS Core Concepts", href: "/docs/frontend/css-core" },
                { title: "CSS Selectors", href: "/docs/frontend/css-selectors" },
                { title: "Box Model", href: "/docs/frontend/css-box-model" },
                { title: "Layout — Flexbox & Grid", href: "/docs/frontend/css-layout" },
                { title: "Responsive Design", href: "/docs/frontend/css-responsive" },
                { title: "Animations & Transitions", href: "/docs/frontend/css-animations" },
                { title: "JavaScript Basics", href: "/docs/frontend/js-basics" },
                { title: "Asynchronous JavaScript", href: "/docs/frontend/js-async" },
                { title: "Event Loop", href: "/docs/frontend/js-event-loop" },
                { title: "Advanced JavaScript", href: "/docs/frontend/js-advanced" },
                { title: "TypeScript Fundamentals", href: "/docs/frontend/ts-fundamentals" },
                { title: "React Core Concepts", href: "/docs/frontend/react-core" },
                { title: "React Hooks", href: "/docs/frontend/react-hooks" },
                { title: "Advanced React", href: "/docs/frontend/react-advanced" },
            ],
        },
        {
            title: "3. Backend",
            items: [
                { title: "Event Loop & Architecture", href: "/docs/backend/node-event-loop" },
                { title: "Streams & Buffers", href: "/docs/backend/node-streams" },
                { title: "Clustering & Worker Threads", href: "/docs/backend/node-clustering" },
                { title: "Routing & Middleware", href: "/docs/backend/express-routing-middleware" },
                { title: "Authentication & Security", href: "/docs/backend/express-auth" },
            ],
        },
        {
            title: "4. Databases",
            items: [
                { title: "MongoDB CRUD", href: "/docs/databases/mongo-crud" },
                { title: "Aggregation Pipeline", href: "/docs/databases/mongo-aggregation" },
                { title: "Indexing & Schema Design", href: "/docs/databases/mongo-indexing" },
                { title: "Core SQL Commands", href: "/docs/databases/sql-core" },
                { title: "PostgreSQL Advanced", href: "/docs/databases/pg-advanced" },
                { title: "Prisma ORM", href: "/docs/databases/prisma-fundamentals" },
                { title: "Drizzle ORM", href: "/docs/databases/drizzle-fundamentals" },
            ],
        },
        {
            title: "5. DevOps & Infrastructure",
            items: [
                { title: "Linux Essentials", href: "/docs/devops/linux-essentials" },
                { title: "Docker Core Concepts", href: "/docs/devops/docker-core" },
                { title: "Docker Compose", href: "/docs/devops/docker-compose" },
                { title: "Kubernetes Core", href: "/docs/devops/k8s-core" },
                { title: "Prometheus", href: "/docs/devops/prometheus" },
                { title: "Grafana", href: "/docs/devops/grafana" },
            ],
        },
        {
            title: "6. System Design",
            items: [
                { title: "Scalability", href: "/docs/system-design/scalability" },
                { title: "CAP Theorem", href: "/docs/system-design/cap-theorem" },
                { title: "Sharding & Partitioning", href: "/docs/system-design/sharding" },
                { title: "Caching Strategies", href: "/docs/system-design/caching-sd" },
                { title: "Message Queues", href: "/docs/system-design/queues-sd" },
                { title: "Microservices & API Gateway", href: "/docs/system-design/microservices-sd" },
                { title: "URL Shortener", href: "/docs/system-design/url-shortener" },
                { title: "Chat Application", href: "/docs/system-design/chat-app" },
                { title: "Video Streaming", href: "/docs/system-design/streaming-service" },
            ],
        },
        {
            title: "7. Low-Level Design",
            items: [
                { title: "Classes & Objects", href: "/docs/lld/classes-objects" },
                { title: "Inheritance", href: "/docs/lld/inheritance" },
                { title: "Polymorphism", href: "/docs/lld/polymorphism" },
                { title: "Encapsulation", href: "/docs/lld/encapsulation" },
                { title: "Abstraction", href: "/docs/lld/abstraction" },
                { title: "Association & Composition", href: "/docs/lld/relationships" },
                { title: "Single Responsibility", href: "/docs/lld/srp" },
                { title: "Open/Closed Principle", href: "/docs/lld/ocp" },
                { title: "Liskov Substitution", href: "/docs/lld/lsp" },
                { title: "Interface Segregation", href: "/docs/lld/isp" },
                { title: "Dependency Inversion", href: "/docs/lld/dip" },
                { title: "Creational Patterns", href: "/docs/lld/creational-patterns" },
                { title: "Structural Patterns", href: "/docs/lld/structural-patterns" },
                { title: "Behavioral Patterns", href: "/docs/lld/behavioral-patterns" },
            ],
        },
        {
            title: "8. High-Level Design",
            items: [
                { title: "Scalability", href: "/docs/hld/scalability" },
                { title: "CAP Theorem", href: "/docs/hld/cap-theorem" },
                { title: "Caching Strategies", href: "/docs/hld/caching" },
                { title: "Message Queues", href: "/docs/hld/message-queues" },
                { title: "Database Design at Scale", href: "/docs/hld/databases-hld" },
                { title: "Microservices Architecture", href: "/docs/hld/microservices" },
            ],
        },
        {
            title: "9. Git",
            items: [
                { title: "Init, Clone, Add & Commit", href: "/docs/git/git-init-commit" },
                { title: "Branching, Merge & Rebase", href: "/docs/git/git-branching" },
                { title: "Stash, Reset & Recovery", href: "/docs/git/git-recovery" },
            ],
        },
        {
            title: "10. Bash & Shell",
            items: [
                { title: "Variables, Loops & Conditionals", href: "/docs/bash/bash-fundamentals" },
                { title: "Pipes, Redirection & Processes", href: "/docs/bash/bash-pipes-processes" },
            ],
        },
        {
            title: "11. AWS",
            items: [
                { title: "EC2 & Lambda", href: "/docs/aws/aws-ec2-lambda" },
                { title: "S3 & EBS", href: "/docs/aws/aws-s3-ebs" },
                { title: "RDS & DynamoDB", href: "/docs/aws/aws-rds-dynamodb" },
                { title: "VPC, CloudFront & Route53", href: "/docs/aws/aws-vpc-cdn" },
                { title: "IAM & Security", href: "/docs/aws/aws-iam-security" },
            ],
        },
        {
            title: "12. Interview Questions",
            items: [
                { title: "DSA", href: "/docs/interview-questions/dsa" },
                { title: "Frontend", href: "/docs/interview-questions/frontend" },
                { title: "Backend", href: "/docs/interview-questions/backend" },
                { title: "Databases", href: "/docs/interview-questions/databases" },
                { title: "System Design", href: "/docs/interview-questions/system-design" },
                { title: "LLD & OOPs", href: "/docs/interview-questions/lld" },
                { title: "Operating Systems", href: "/docs/interview-questions/os" },
                { title: "Networking & TCP/IP", href: "/docs/interview-questions/networking" },
                { title: "Software Engineering", href: "/docs/interview-questions/software-engineering" },
                { title: "Company Experiences", href: "/docs/interview-questions/company-experiences" },
            ],
        },
    ],
};
