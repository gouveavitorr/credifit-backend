# credifit-backend

- payroll loan for partnering companies' employees
- company representative has access to the system to register employees
- loan limit: at most, 35% of an employees salary

- minimum score for loan availability: https://mocki.io/v1/f7b3627c-444a-4d65-b76b-d94a6c63bdcf if the link doesn't work, payload needs to be {"score": 650}
  - 0 - 2k salary - at least 400 score
  - 2 - 4k salary - at least 500 score
  - 8k salary - at least 600 score
  - 12k salary - at least 700 score
  - more than 12k - not available?

- employee's cnpj must be one of our database's cnpj from a companyRepresentative
- at the end of the loan request, if it was approved, the system makes a request from https://mocki.io/v1/386c594b-d42f-4d14-8036-508a0cf1264c to emulate the delivery
  - if the link has problems, send a payload with {"status": "aprovado"}

- parcels: 1 to 4 times in equal parts
- due date must be the same day of the next months, so 05/05, 06/05, 07/05
- loan request history is needed: one for loans within a cnpj, and another one for loans within a cpf

- login/signUp screen: employee or representative. employees with invalid cnpjs must have access denied
