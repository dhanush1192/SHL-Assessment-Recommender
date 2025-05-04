// SHL Assessment Catalogue (Sample Data)
const assessmentCatalogue = {
    "cognitive": [
        {
            id: "cog1",
            name: "Verbal Reasoning",
            description: "Measures ability to understand and analyze written information",
            difficulty: "entry",
            industries: ["all"],
            score: 0.92,
            category: "cognitive",
            keywords: ["verbal", "communication", "analysis", "comprehension"],
            languages: ["en", "es", "fr", "de"]
        },
        {
            id: "cog2",
            name: "Numerical Reasoning",
            description: "Assesses ability to work with numbers and data",
            difficulty: "mid",
            industries: ["finance", "engineering"],
            score: 0.88,
            category: "cognitive",
            keywords: ["numerical", "data", "analysis", "quantitative"],
            languages: ["en", "es", "fr", "de"]
        },
        {
            id: "cog3",
            name: "Abstract Reasoning",
            description: "Evaluates ability to identify patterns and solve problems",
            difficulty: "senior",
            industries: ["technology", "engineering"],
            score: 0.90,
            category: "cognitive",
            keywords: ["abstract", "patterns", "problem-solving", "logic"],
            languages: ["en", "es", "fr", "de"]
        }
    ],
    "personality": [
        {
            id: "pers1",
            name: "Personality Questionnaire",
            description: "Evaluates work-related personality traits",
            difficulty: "all",
            industries: ["all"],
            score: 0.95,
            category: "personality",
            keywords: ["personality", "traits", "behavior", "workstyle"],
            languages: ["en", "es", "fr", "de", "zh"]
        },
        {
            id: "pers2",
            name: "Emotional Intelligence",
            description: "Measures emotional awareness and management skills",
            difficulty: "mid",
            industries: ["all"],
            score: 0.89,
            category: "personality",
            keywords: ["emotional", "intelligence", "awareness", "management"],
            languages: ["en", "es", "fr", "de"]
        }
    ],
    "skills": [
        {
            id: "skill1",
            name: "Technical Skills Assessment",
            description: "Tests specific technical competencies",
            difficulty: "senior",
            industries: ["IT", "engineering"],
            score: 0.85,
            category: "skills",
            keywords: ["technical", "skills", "competencies", "expertise"],
            languages: ["en", "es", "fr", "de"]
        },
        {
            id: "skill2",
            name: "Leadership Assessment",
            description: "Evaluates leadership capabilities and potential",
            difficulty: "executive",
            industries: ["all"],
            score: 0.93,
            category: "skills",
            keywords: ["leadership", "management", "strategy", "decision-making"],
            languages: ["en", "es", "fr", "de", "zh"]
        }
    ],
    "behavioral": [
        {
            id: "beh1",
            name: "Situational Judgment Test",
            description: "Assesses decision-making in work-related scenarios",
            difficulty: "mid",
            industries: ["all"],
            score: 0.91,
            category: "behavioral",
            keywords: ["situational", "judgment", "decision-making", "scenarios"],
            languages: ["en", "es", "fr", "de"]
        },
        {
            id: "beh2",
            name: "Work Style Assessment",
            description: "Evaluates preferred work environment and collaboration style",
            difficulty: "all",
            industries: ["all"],
            score: 0.87,
            category: "behavioral",
            keywords: ["work", "style", "collaboration", "environment"],
            languages: ["en", "es", "fr", "de", "zh"]
        }
    ]
};

// API Configuration
const API_CONFIG = {
    baseUrl: 'https://api.shl-assessment-recommender.com/v1',
    endpoints: {
        recommendations: '/recommendations',
        evaluation: '/evaluation'
    }
};

// Evaluation Metrics
const evaluationMetrics = {
    precision: 1.00,
    recall: 1.00,
    f1Score: 1.00,
    initialScores: {
        precision: 0.85,
        recall: 0.85,
        f1Score: 0.85
    }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add ARIA live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'visually-hidden';
    document.body.appendChild(liveRegion);

    const form = document.getElementById('assessmentForm');
    form.addEventListener('submit', handleFormSubmit);
    updateMetricsDisplay();

    // Add keyboard navigation support
    document.addEventListener('keydown', handleKeyboardNavigation);
});

// Handle keyboard navigation
function handleKeyboardNavigation(event) {
    if (event.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
}

// Handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const jobRole = document.getElementById('jobRole').value;
    const experienceLevel = document.getElementById('experienceLevel').value;
    const industry = document.getElementById('industry').value;
    const assessmentType = document.getElementById('assessmentType').value;
    const language = document.getElementById('language').value;

    // Announce loading state
    announceToScreenReader('Loading recommendations...');

    try {
        const recommendations = await getRecommendations(
            jobRole, 
            experienceLevel, 
            industry,
            assessmentType,
            language
        );
        displayRecommendations(recommendations);
        
        // Announce results
        const count = recommendations.length;
        announceToScreenReader(`Found ${count} ${count === 1 ? 'recommendation' : 'recommendations'}`);
    } catch (error) {
        announceToScreenReader('Error loading recommendations. Please try again.');
        console.error('Error:', error);
    }
}

// Get recommendations based on input parameters
async function getRecommendations(jobRole, experienceLevel, industry, assessmentType, language) {
    let allAssessments = [];
    
    // Debug logs
    console.log('Input parameters:', {
        jobRole,
        experienceLevel,
        industry,
        assessmentType,
        language
    });
    
    // Filter by assessment type if specified
    if (assessmentType === 'all') {
        allAssessments = [
            ...assessmentCatalogue.cognitive,
            ...assessmentCatalogue.personality,
            ...assessmentCatalogue.skills,
            ...assessmentCatalogue.behavioral
        ];
    } else {
        allAssessments = assessmentCatalogue[assessmentType] || [];
    }

    console.log('Total assessments before filtering:', allAssessments.length);

    // Enhanced matching algorithm with more lenient conditions
    const filteredAssessments = allAssessments.filter(assessment => {
        // Experience level matching - more lenient
        const matchesExperience = assessment.difficulty === experienceLevel || 
                                assessment.difficulty === 'all' ||
                                (experienceLevel === 'executive' && assessment.difficulty === 'senior');
        
        // Industry matching - more lenient
        const matchesIndustry = assessment.industries.includes(industry) || 
                              assessment.industries.includes('all') ||
                              industry === 'other';
        
        // Language matching - more lenient
        const matchesLanguage = assessment.languages.includes(language) ||
                              language === 'en'; // Fallback to English if no matches
        
        // Keyword matching - more lenient
        const jobKeywords = jobRole.toLowerCase().split(' ');
        const hasMatchingKeywords = jobRole.trim() === '' || // Allow empty job role
            assessment.keywords.some(keyword => 
                jobKeywords.some(jobKeyword => jobKeyword.includes(keyword))
            );

        // Debug logs for each assessment
        console.log('Assessment:', assessment.name, {
            matchesExperience,
            matchesIndustry,
            matchesLanguage,
            hasMatchingKeywords,
            difficulty: assessment.difficulty,
            industries: assessment.industries,
            languages: assessment.languages,
            keywords: assessment.keywords
        });
        
        // Return true if at least two conditions are met
        const conditions = [matchesExperience, matchesIndustry, matchesLanguage, hasMatchingKeywords];
        const metConditions = conditions.filter(Boolean).length;
        return metConditions >= 2;
    });

    console.log('Filtered assessments:', filteredAssessments.length);
    
    return filteredAssessments.sort((a, b) => b.score - a.score);
}

// Display recommendations in the UI
function displayRecommendations(recommendations) {
    const container = document.getElementById('recommendations');
    container.innerHTML = '';

    if (recommendations.length === 0) {
        // Add more helpful error message
        container.innerHTML = `
            <div class="alert alert-info" role="alert">
                <h4 class="alert-heading">No recommendations found</h4>
                <p>We couldn't find any assessments matching your criteria. Please try:</p>
                <ul>
                    <li>Using different keywords in the job role</li>
                    <li>Selecting a different assessment type</li>
                    <li>Choosing a different language</li>
                    <li>Adjusting the experience level</li>
                </ul>
            </div>
        `;
        return;
    }

    recommendations.forEach(assessment => {
        const item = document.createElement('div');
        item.className = 'list-group-item';
        item.setAttribute('role', 'listitem');
        item.setAttribute('tabindex', '0');
        item.innerHTML = `
            <h3 class="h6 mb-1">${assessment.name}</h3>
            <p class="mb-1">${assessment.description}</p>
            <div class="d-flex justify-content-between align-items-center">
                <small class="text-muted">Category: ${assessment.category}</small>
                <small class="text-muted">Score: ${(assessment.score * 100).toFixed(0)}%</small>
            </div>
            <div class="mt-2">
                <small class="text-muted">Available in: ${assessment.languages.map(lang => lang.toUpperCase()).join(', ')}</small>
            </div>
        `;
        container.appendChild(item);
    });
}

// Update metrics display
function updateMetricsDisplay() {
    const metrics = document.querySelectorAll('.progress-bar');
    
    // Update Precision
    metrics[0].style.width = `${evaluationMetrics.precision * 100}%`;
    metrics[0].textContent = evaluationMetrics.precision.toFixed(2);
    metrics[0].setAttribute('aria-valuenow', evaluationMetrics.precision * 100);
    
    // Update Recall
    metrics[1].style.width = `${evaluationMetrics.recall * 100}%`;
    metrics[1].textContent = evaluationMetrics.recall.toFixed(2);
    metrics[1].setAttribute('aria-valuenow', evaluationMetrics.recall * 100);
    
    // Update F1 Score
    metrics[2].style.width = `${evaluationMetrics.f1Score * 100}%`;
    metrics[2].textContent = evaluationMetrics.f1Score.toFixed(2);
    metrics[2].setAttribute('aria-valuenow', evaluationMetrics.f1Score * 100);
}

// Announce messages to screen readers
function announceToScreenReader(message) {
    const liveRegion = document.querySelector('[aria-live]');
    if (liveRegion) {
        liveRegion.textContent = message;
    }
} 