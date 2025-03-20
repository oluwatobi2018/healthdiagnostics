// List of all 36 Nigerian states
const STATES_IN_NIGERIA = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta",
    "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
    "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
  ];
  
  // Common medical specialties
  const SPECIALTIES_LIST = [
    "General Medicine", "Cardiology", "Neurology", "Oncology", "Pediatrics",
    "Orthopedics", "Gynecology", "Urology", "Nephrology", "Endocrinology",
    "Dermatology", "Psychiatry", "Ophthalmology", "ENT (Ear, Nose, Throat)",
    "Pulmonology", "Gastroenterology", "Rheumatology", "Infectious Diseases",
    "Hematology", "Anesthesiology", "Radiology", "Surgery"
  ];
  
  // Default medications for general prescriptions
  const COMMON_MEDICATIONS = [
    "Paracetamol", "Ibuprofen", "Amoxicillin", "Metronidazole", "Ciprofloxacin",
    "Loratadine", "Cetirizine", "Omeprazole", "Losartan", "Amlodipine"
  ];
  
  // Default blood groups
  const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  
  // Default genotypes
  const GENOTYPES = ["AA", "AS", "SS", "SC"];
  
  // Export constants
  module.exports = {
    STATES_IN_NIGERIA,
    SPECIALTIES_LIST,
    COMMON_MEDICATIONS,
    BLOOD_GROUPS,
    GENOTYPES
  };
  