import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { ProjectsSection } from '../components/ProjectsSection';
import { Chat } from '../components/Chat';
import { ProjectPreview } from '../components/ProjectPreview';
import { ContentPreview } from '../components/ContentPreview';
import { getProjects } from '../services/projectService';
import { fetchBio } from '../services/geminiService';
import { Tabs } from '../components/RepoTabs';
import type { Project, ChatMessage, TabItem } from '../types';
import { ChipIcon } from '../components/icons/ChipIcon';
import { SparklesIcon } from '../components/icons/SparklesIcon';
import { DocumentIcon } from '../components/icons/DocumentIcon';
import { MailIcon } from '../components/icons/MailIcon';
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon';
import { Footer } from '../components/Footer';

const Section: React.FC<{title: string, children: React.ReactNode}> = ({title, children}) => (
  <div className="mb-6 last:mb-0">
    <h3 className="text-base font-semibold text-slate-800 mb-3 border-b border-slate-200 pb-2">{title}</h3>
    {children}
  </div>
);

const SkillList: React.FC<{items: string[]}> = ({items}) => (
    <div className="flex flex-wrap gap-2">
        {items.map(item => (
            <span key={item} className="bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-full">{item}</span>
        ))}
    </div>
);

const TechnicalSkillsTab = () => (
    <div className="text-sm">
        <Section title="Languages & Frameworks">
            <SkillList items={['Python (Pandas, NumPy)', 'SQL (T-SQL)', 'DAX', 'VBA']} />
        </Section>
        <Section title="Tools & Platforms">
             <SkillList items={['Power BI', 'Azure DevOps', 'PowerApps', 'Power Automate', 'Dynamics 365', 'SharePoint']} />
        </Section>
        <Section title="Databases">
            <SkillList items={['SQL Server', 'Azure SQL Database', 'Dataverse']} />
        </Section>
    </div>
);

const SoftSkillItem: React.FC<{title: string, children: React.ReactNode}> = ({title, children}) => (
    <div className="mb-4">
        <h4 className="font-semibold text-slate-700">{title}</h4>
        <p className="text-sm text-slate-600 mt-1">{children}</p>
    </div>
);

const SoftSkillsTab = () => (
    <div>
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

const QualificationsTab = () => (
    <div>
        <Section title="Experience">
            <div className="mb-4">
                <h4 className="font-semibold">Data and Reporting Analyst</h4>
                <p className="text-sm text-slate-500">Fictional Company | 2020 - Present</p>
                <ul className="list-disc list-inside text-sm text-slate-600 mt-2 space-y-1">
                    <li>Developed comprehensive Power BI dashboards for procurement analytics.</li>
                    <li>Engineered automated data quality pipelines using Python and Azure DevOps.</li>
                    <li>Created PowerApps solutions to streamline business processes like vendor onboarding.</li>
                </ul>
            </div>
        </Section>
        <Section title="Education">
             <h4 className="font-semibold">Bachelor of Science in Information Systems</h4>
             <p className="text-sm text-slate-500">Fictional University | 2016 - 2020</p>
        </Section>
        <Section title="Certifications">
            <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                <li>Microsoft Certified: Power BI Data Analyst Associate</li>
                <li>Azure Data Fundamentals (DP-900)</li>
            </ul>
        </Section>
    </div>
);

const ContactTab = () => (
    <div className="text-center p-4 sm:p-8 flex flex-col items-center justify-center min-h-[200px]">
        <h3 className="text-xl font-bold text-slate-800">Let's Connect!</h3>
        <p className="mt-2 text-slate-600 max-w-md">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious vision.
        </p>
        <Link to="/contact" className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all transform hover:scale-105 text-center">
            Get in Touch
        </Link>
    </div>
);


const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectPreview, setProjectPreview] = useState<Project | null>(null);
  const [contentPreview, setContentPreview] = useState<ChatMessage | null>(null);
  const [bio, setBio] = useState<string>('');

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProjects = async () => {
      const fetchedProjects = await getProjects();
      setProjects(fetchedProjects);
    };

    fetchBio().then(setBio).catch(() => setBio(''));
    fetchProjects();
  }, []);

  const handleSetProjectPreview = (projectId: number) => {
    const projectToShow = projects.find(p => p.id === projectId);
    setContentPreview(null);
    setProjectPreview(projectToShow || null);
  };

  const handleSetContentPreview = (message: ChatMessage) => {
    setProjectPreview(null);
    setContentPreview(message);
  };

  const handleClosePreview = () => {
    setProjectPreview(null);
    setContentPreview(null);
  };

  const showPreview = projectPreview || contentPreview;

  const tabData: TabItem[] = [
    { id: 'tech-skills', label: 'Technical Skills', icon: <ChipIcon />, content: <TechnicalSkillsTab /> },
    { id: 'soft-skills', label: 'Soft Skills', icon: <SparklesIcon />, content: <SoftSkillsTab /> },
    { id: 'qualifications', label: 'Qualifications', icon: <DocumentIcon />, content: <QualificationsTab /> },
    { id: 'contact', label: 'Contact', icon: <MailIcon />, content: <ContactTab /> },
  ];

  return (
    <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col">
            <Hero bio={bio} />
            
            <div className="my-8 animate-slide-in-up" style={{ animationDelay: '200ms', opacity: 0 }}>
                <Tabs tabs={tabData} persistSelection={true} storageKey="portfolio-active-tab"/>
            </div>

            <section id="chat-interactive" className="relative flex-grow flex flex-col animate-slide-in-up" style={{ animationDelay: '300ms', opacity: 0 }}>
                <div className="w-full flex items-start gap-8 transition-all duration-500 ease-in-out flex-grow">
                <div className={`transition-all duration-500 ease-in-out h-full ${showPreview ? 'w-full lg:w-1/2' : 'w-full lg:w-2/3 mx-auto'}`}>
                    <Chat 
                    setProjectPreview={handleSetProjectPreview}
                    setContentPreview={handleSetContentPreview}
                    clearPreviews={handleClosePreview}
                    />
                </div>
                <div className={`hidden lg:block transition-all duration-500 ease-in-out h-full ${showPreview ? 'w-1/2 opacity-100' : 'w-0 opacity-0'}`}>
                    {projectPreview && <ProjectPreview project={projectPreview} onClose={handleClosePreview} />}
                    {contentPreview && <ContentPreview message={contentPreview} onClose={handleClosePreview} />}
                </div>
                </div>
                {/* Mobile Preview - Appears below chat */}
                <div className="lg:hidden mt-8">
                    {projectPreview && <ProjectPreview project={projectPreview} onClose={handleClosePreview} />}
                    {contentPreview && <ContentPreview message={contentPreview} onClose={handleClosePreview} />}
                </div>
            </section>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <ProjectsSection projects={projects.slice(0, 2)} />
            {projects.length > 2 && (
                <div className="text-center -mt-8 mb-16">
                    <Link to="/projects" className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-800 group">
                        View All Projects
                        <ArrowRightIcon className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            )}
        </div>
        <Footer />
    </>
  );
};

export default Home;
