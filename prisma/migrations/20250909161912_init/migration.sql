-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "salary" REAL NOT NULL,
    "companyId" INTEGER,
    "UserId" INTEGER NOT NULL,
    CONSTRAINT "Employee_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Employee_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Employee" ("UserId", "companyId", "id", "salary") SELECT "UserId", "companyId", "id", "salary" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE UNIQUE INDEX "Employee_companyId_key" ON "Employee"("companyId");
CREATE UNIQUE INDEX "Employee_UserId_key" ON "Employee"("UserId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
