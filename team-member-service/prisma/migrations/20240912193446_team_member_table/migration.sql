-- CreateTable
CREATE TABLE "TeamMember" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "specialization" TEXT,
    "workHours" TEXT,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_user_id_key" ON "TeamMember"("user_id");

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
