# Python ML Project Example

This example demonstrates how to use Handoff AI with a Python machine learning project using scikit-learn, pandas, and Jupyter notebooks.

## Project Structure

```
python-ml/
├── .project/                    # Handoff AI configuration
│   ├── handoff-config.md       # ML-specific collaboration settings
│   ├── assumptions.md          # ML model and data decisions
│   ├── ai-quick-start.md       # Context for AI assistants
│   └── epics/                  # ML development workflows
├── src/
│   ├── data/                   # Data processing modules
│   ├── models/                 # ML model implementations
│   ├── features/               # Feature engineering
│   ├── evaluation/             # Model evaluation utilities
│   └── utils/                  # Common utilities
├── notebooks/                  # Jupyter notebooks for exploration
├── data/                       # Dataset storage
│   ├── raw/                    # Raw data files
│   ├── processed/              # Cleaned and processed data
│   └── external/               # External datasets
├── models/                     # Trained model artifacts
├── reports/                    # Analysis reports and visualizations
└── tests/                      # Unit and integration tests
```

## Handoff AI Configuration

### ML-Specific Settings
```markdown
# .project/handoff-config.md

## ML Development Context
- **Framework:** scikit-learn with pandas and numpy
- **Notebooks:** Jupyter for exploration, Python modules for production
- **Data:** Customer churn prediction dataset
- **Models:** Classification (Random Forest, XGBoost, Neural Networks)
- **Evaluation:** Cross-validation, ROC-AUC, precision/recall

## Collaboration Preferences
- **Mode:** guided (for model selection decisions)
- **Engagement:** high-engagement (ML requires domain expertise)
- **Expertise:** intermediate
- **Trust Level:** medium (ML decisions need validation)
```

### Key ML Assumptions Documented
```markdown
# .project/assumptions.md

## Data Processing Decisions

### Feature Engineering Strategy
- **Decision:** StandardScaler for numerical features, OneHotEncoder for categorical
- **Rationale:** Ensures all features contribute equally to distance-based algorithms
- **AI Assumption:** Apply same preprocessing to training and inference data

### Data Splitting Strategy
- **Decision:** 70/15/15 train/validation/test split with stratification
- **Rationale:** Maintains class distribution across splits
- **AI Assumption:** Use random_state=42 for reproducibility

### Model Selection Approach
- **Decision:** Start with Random Forest baseline, then try XGBoost and Neural Networks
- **Rationale:** Random Forest provides good baseline with feature importance
- **AI Assumption:** Use cross-validation for model comparison

### Evaluation Metrics
- **Primary:** ROC-AUC (balanced dataset consideration)
- **Secondary:** Precision, Recall, F1-score
- **Business:** False positive/negative costs consideration
- **AI Assumption:** Optimize for business impact, not just accuracy
```

## AI Collaboration Examples

### Data Exploration
```
"Please follow the Codebase Exploration EPIC to help me understand this customer churn dataset. Use high-engagement mode and focus on:
1. Data quality assessment
2. Feature distribution analysis  
3. Target variable balance
4. Correlation analysis
5. Missing value patterns

Follow our documented preprocessing assumptions."
```

### Model Development
```
"Using the Feature Implementation EPIC, help me implement a Random Forest model for churn prediction. Follow our documented:
- Data splitting strategy (70/15/15 with stratification)
- Feature engineering approach (StandardScaler + OneHotEncoder)
- Evaluation metrics (ROC-AUC primary, business metrics secondary)
- Cross-validation setup

Use guided mode for model hyperparameter decisions."
```

### Model Optimization
```
"Please use the Codebase Improvement EPIC to optimize our churn prediction model. Focus on:
1. Hyperparameter tuning using our documented approach
2. Feature selection based on importance scores
3. Model interpretability improvements
4. Performance optimization for inference

Document all optimization decisions in assumptions.md."
```

## Workflow Examples

### 1. New Feature Engineering

**AI Request:**
```
Help me implement new features for customer behavior analysis:

1. Check .project/assumptions.md for our feature engineering patterns
2. Follow our preprocessing pipeline approach
3. Maintain consistency with existing feature naming
4. Add proper validation and testing
5. Update feature documentation
```

**Expected AI Response:**
```
Based on your .project/assumptions.md, I see you're using:
- StandardScaler for numerical features
- OneHotEncoder for categorical features  
- Consistent naming convention: feature_category_name

Here's the implementation following your patterns:

[Feature engineering code with proper preprocessing pipeline integration]
```

### 2. Model Comparison

**AI Request:**
```
Using the Collaborative Documentation EPIC, help me create a comprehensive model comparison report. Include our documented evaluation metrics and business impact analysis.
```

### 3. Production Pipeline

**AI Request:**
```
Help me implement the inference pipeline following our documented preprocessing and model assumptions. Ensure consistency between training and inference data handling.
```

## Benefits Demonstrated

### Consistent ML Practices
- Standardized data preprocessing across all models
- Consistent evaluation methodology
- Reproducible model training with documented random seeds

### Faster Experimentation
- AI understands project context and data patterns
- No need to re-explain preprocessing steps
- Consistent notebook and code structure

### Better Model Quality
- AI follows documented best practices
- Consistent validation and testing approaches
- Proper handling of data leakage prevention

### Team Collaboration
- New data scientists can use AI with full context
- Consistent ML methodology across team members
- Documented decisions prevent conflicting approaches

## Integration with ML Tools

### Jupyter Notebooks
```python
# AI understands to use these patterns in notebooks
import sys
sys.path.append('../src')

from data.preprocessing import load_and_preprocess_data
from models.baseline import RandomForestBaseline
from evaluation.metrics import calculate_business_metrics

# Follow documented data loading pattern
X_train, X_val, X_test, y_train, y_val, y_test = load_and_preprocess_data()
```

### Model Training
```python
# AI follows documented model training patterns
from sklearn.model_selection import cross_val_score
from sklearn.ensemble import RandomForestClassifier

# Use documented hyperparameters and random state
rf_model = RandomForestClassifier(
    n_estimators=100,
    max_depth=10,
    random_state=42  # Documented for reproducibility
)

# Follow documented cross-validation approach
cv_scores = cross_val_score(rf_model, X_train, y_train, 
                           cv=5, scoring='roc_auc')
```

### Model Evaluation
```python
# AI uses documented evaluation approach
from evaluation.metrics import comprehensive_evaluation

# Follow documented evaluation metrics
results = comprehensive_evaluation(
    model=rf_model,
    X_test=X_test,
    y_test=y_test,
    include_business_metrics=True  # Documented requirement
)
```

## Documentation Integration

### Automated Documentation
```bash
# AI can help maintain ML documentation
handoff-ai inject-docs --files "src/**/*.py"
handoff-ai inject-docs --files "notebooks/*.py"  # For .py versions of notebooks
```

### Model Documentation
```python
"""
Customer Churn Prediction Model

This module implements Random Forest classification for customer churn prediction
following the documented preprocessing and evaluation approach.

Model Performance:
- ROC-AUC: 0.85 (validation set)
- Precision: 0.78
- Recall: 0.82
- Business Impact: 15% reduction in churn through targeted interventions

@returns: Trained RandomForestClassifier with documented hyperparameters
"""
```

## Key Learnings

1. **ML Context is Critical:** Documenting data assumptions, preprocessing steps, and evaluation criteria helps AI generate consistent ML code

2. **Reproducibility Matters:** Documented random seeds and preprocessing steps ensure reproducible results

3. **Business Focus:** Including business metrics and impact in assumptions helps AI optimize for real-world value

4. **Iterative Development:** Using EPICs for ML workflows (exploration → modeling → optimization) provides structured approach

## Advanced ML Patterns

### Experiment Tracking
```python
# AI follows documented experiment tracking
import mlflow

# Use documented experiment naming convention
mlflow.set_experiment("churn_prediction_v2")

with mlflow.start_run():
    # Log parameters following documented approach
    mlflow.log_params({
        "model_type": "random_forest",
        "n_estimators": 100,
        "preprocessing": "standard_scaler_onehot"
    })
    
    # Log metrics following documented evaluation
    mlflow.log_metrics({
        "roc_auc": roc_auc_score,
        "business_impact": calculated_impact
    })
```

### Model Versioning
```python
# AI understands documented model versioning approach
import joblib
from datetime import datetime

# Follow documented model naming convention
model_name = f"churn_rf_{datetime.now().strftime('%Y%m%d_%H%M')}"
joblib.dump(rf_model, f"models/{model_name}.pkl")

# Document model metadata
model_metadata = {
    "model_type": "RandomForestClassifier",
    "training_date": datetime.now().isoformat(),
    "performance": {"roc_auc": 0.85, "precision": 0.78},
    "features": feature_names,
    "preprocessing": "documented_pipeline_v1"
}
```

## Next Steps

To implement this pattern in your ML project:

1. **Initialize Handoff:** `npx handoff-ai init --template full`
2. **Document ML Patterns:** Add your preprocessing and evaluation patterns to `.project/assumptions.md`
3. **Configure for ML:** Set high-engagement mode for model decisions
4. **Start Experimenting:** Use EPICs for structured ML development
5. **Maintain Documentation:** Regular `inject-docs` runs for code documentation

This example shows how Handoff AI transforms ML development from repetitive explanations to efficient, context-aware collaboration that maintains scientific rigor and business focus.