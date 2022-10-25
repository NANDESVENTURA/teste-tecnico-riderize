-- DropIndex
DROP INDEX "Ride_user_id_key";

-- DropIndex
DROP INDEX "Subscription_ride_id_key";

-- DropIndex
DROP INDEX "Subscription_user_id_key";

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id");
