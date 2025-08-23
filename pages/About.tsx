import React, { useEffect } from 'react';

const Section: React.FC<{title: string, children: React.ReactNode, id?: string}> = ({title, children, id}) => (
  <section id={id} className="mb-12 bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200">
    <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-4">{title}</h2>
    {children}
  </section>
);

const SkillList: React.FC<{items: string[]}> = ({items}) => (
    <div className="flex flex-wrap gap-2">
        {items.map(item => (
            <span key={item} className="bg-slate-100 text-slate-700 text-sm font-medium px-3 py-1.5 rounded-full">{item}</span>
        ))}
    </div>
);

const TechnicalSkills = () => (
    <div className="space-y-6">
        <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-3">Languages & Frameworks</h3>
            <SkillList items={['Python (Pandas, NumPy)', 'SQL (T-SQL)', 'DAX', 'VBA']} />
        </div>
        <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-3">Tools & Platforms</h3>
             <SkillList items={['Power BI', 'Azure DevOps', 'PowerApps', 'Power Automate', 'Dynamics 365', 'SharePoint']} />
        </div>
        <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-3">Databases</h3>
            <SkillList items={['SQL Server', 'Azure SQL Database', 'Dataverse']} />
        </div>
    </div>
);

const SoftSkillItem: React.FC<{title: string, children: React.ReactNode}> = ({title, children}) => (
    <div className="mb-4">
        <h4 className="font-semibold text-slate-800">{title}</h4>
        <p className="text-slate-600 mt-1">{children}</p>
    </div>
);

const SoftSkills = () => (
    <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
        <SoftSkillItem title="Analytical Thinking">
            Deconstructing complex problems into manageable components and identifying key data points for analysis.
        </SoftSkillItem>
        <SoftSkillItem title="Communication & Storytelling">
            Translating complex data findings into clear, actionable insights for both technical and non-technical stakeholders.
        </SoftSkillItem>
        <SoftSkillItem title="Problem-Solving">
            Proactively identifying business challenges and designing data-driven solutions to address them.
        </SoftSkillItem>
         <SoftSkillItem title="Collaboration">
            Working effectively with cross-functional teams to gather requirements, align on goals, and deliver impactful results.
        </SoftSkillItem>
    </div>
);

const Qualifications = () => (
    <div className="space-y-8">
        <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Experience</h3>
            <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-bold text-slate-800">Data and Reporting Analyst</h4>
                <p className="text-sm text-slate-500 mb-2">Fictional Company | 2020 - Present</p>
                <ul className="list-disc list-inside text-slate-600 space-y-1">
                    <li>Developed comprehensive Power BI dashboards for procurement analytics.</li>
                    <li>Engineered automated data quality pipelines using Python and Azure DevOps.</li>
                    <li>Created PowerApps solutions to streamline business processes like vendor onboarding.</li>
                </ul>
            </div>
        </div>
        <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Education</h3>
            <div className="border-l-4 border-blue-500 pl-4">
                 <h4 className="font-bold text-slate-800">Bachelor of Science in Information Systems</h4>
                 <p className="text-sm text-slate-500">Fictional University | 2016 - 2020</p>
            </div>
        </div>
        <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-4">Certifications</h3>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                <li>Microsoft Certified: Power BI Data Analyst Associate</li>
                <li>Azure Data Fundamentals (DP-900)</li>
            </ul>
        </div>
    </div>
);

const About: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 animate-fade-in">
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">About Me</h1>
                <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                    A dedicated Data Analyst with a passion for transforming data into actionable insights and building efficient, automated solutions.
                </p>
            </header>

            <div className="space-y-12">
                <Section title="Technical Skills" id="skills">
                    <TechnicalSkills />
                </Section>
                
                <Section title="Qualifications">
                    <Qualifications />
                </Section>

                <Section title="Soft Skills">
                    <SoftSkills />
                </Section>
            </div>
        </div>
    );
};

export default About;