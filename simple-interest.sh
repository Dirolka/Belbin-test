#!/usr/bin/env bash
# Calculate simple interest: principal * annual rate * years / 100.
# Run with: bash simple-interest.sh

export LC_ALL=C

read -r -p "Enter principal amount: " principal || exit 1
read -r -p "Enter annual rate of interest (%): " rate || exit 1
read -r -p "Enter time period in years: " time || exit 1

# Accept non-negative integers and decimal numbers.
for value in "$principal" "$rate" "$time"; do
  if [[ ! "$value" =~ ^[0-9]+([.][0-9]+)?$ ]]; then
    echo "Error: enter non-negative numbers using a dot for decimals." >&2
    exit 1
  fi
done

awk -v p="$principal" -v r="$rate" -v t="$time" 'BEGIN {
  interest = p * r * t / 100
  printf "Simple interest: %.2f\n", interest
  printf "Total amount: %.2f\n", p + interest
}'
