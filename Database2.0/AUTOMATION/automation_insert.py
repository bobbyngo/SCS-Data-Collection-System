import openpyxl
import random

# Initialize random seed for reproducibility
random.seed(42)

# Define sites and their basic information
sites_data = [
    (1, "Downtown Health Center", "Metropolis", "ON", "Fixed"),
    (2, "Uptown Clinic", "Gotham", "BC", "Mobile"),
    (3, "Greenfield Medical Center", "Greenfield", "QC", "Fixed"),
    (4, "Valleyview Community Clinic", "Valleyview", "BC", "Fixed"),
    (5, "Sunset Wellness Hub", "Sunset City", "SK", "Fixed"),
    (6, "Rosewood Mobile Health Unit", "Rosewood", "MB", "Mobile")
]
months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
def distribute_value(total, categories):
    parts = [random.randint(0, total) for _ in range(categories - 1)] + [0, total]
    parts.sort()
    return [parts[i+1] - parts[i] for i in range(categories)]

def generate_data(site_id, site_name, city, province, site_type, base_total_consumption):
    total_consumption_variation = random.randint(-500, 500)  # Allow small variation
    total_consumption = max(500, base_total_consumption + total_consumption_variation)
    new_clients = random.randint(1, total_consumption // 2)
    unique_clients = total_consumption - new_clients
    age_distribution = distribute_value(total_consumption, 6)
    gender_distribution = distribute_value(total_consumption, 3)
    total_referrals = random.randint(10, 100)
    total_visits = total_consumption + round(total_referrals * random.uniform(0.1, 0.5))
    substance_use = [random.randint(0, total_visits) for _ in range(14)]
    overdoses = random.randint(15, 50)
    naloxone_administered = random.randint(int(overdoses * 0.1), int(overdoses * 0.7))
    
    return [
        site_id, site_name, city, province, site_type, 2022, total_visits, total_consumption,
        *age_distribution, *gender_distribution, new_clients, unique_clients,
        *substance_use, overdoses, random.randint(15, 50), random.randint(15, 50),
        random.randint(0, 10), naloxone_administered, random.randint(0, 20), total_referrals
    ]

# Create a new Excel workbook and select the active worksheet
wb = openpyxl.Workbook()
ws = wb.active

# Define column names
columns = ["Site ID", "Site Name", "City", "Province", "Site Type", "Report Year", "Total Visits", "Total Consumption", "Under 20", "Age 20-29", "Age 30-39", "Age 40-49", "Age 50-59", "Over 60", "Age Unknown", "Male Clients", "Female Clients", "Other Clients", "New Clients", "Unique Clients", "Cocaine Usage", "Crack Usage", "Methamphetamine Usage", "Amphetamine Usage", "Heroin Usage", "Fentanyl Usage", "Oxycontin/Oxycodone Usage", "Morphine Usage", "Hydromorphone/Dilaudid Usage", "Unspecified Opioid Usage", "Speedball Usage", "Other Substances Usage", "Unknown/Not Specified Substance Usage", "Non-Fatal Overdoses", "Fatal Overdoses", "Other Medical Emergencies", "Law Enforcement Calls", "Naloxone Administered", "EMS Called", "Total Referrals"]


# Generate and write data for each site for each month
base_total_consumption = 1000  # Starting point for total consumption
for month in months:
    for site in sites_data:
        row =[month] + generate_data(*site, base_total_consumption)
        ws.append(row)
    base_total_consumption += random.randint(-100, 100)  # Adjust base for the next month to simulate trends


# Save the workbook to a file
wb.save("yearly_populated_site_data2.xlsx")
